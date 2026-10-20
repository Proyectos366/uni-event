import { createHash, randomUUID } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";

const databaseUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl && !authToken && !process.env.VERCEL) {
  console.log("Skipping Turso migrations outside Vercel.");
  process.exit(0);
}

if (!databaseUrl || !authToken) {
  throw new Error(
    "Set both TURSO_DATABASE_URL and TURSO_AUTH_TOKEN before building or migrating on Vercel.",
  );
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDirectory = path.join(projectRoot, "prisma", "migrations");
const migrationDirectories = (await readdir(migrationsDirectory, {
  withFileTypes: true,
}))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const client = createClient({ url: databaseUrl, authToken });

try {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" VARCHAR(36) PRIMARY KEY NOT NULL,
      "checksum" VARCHAR(64) NOT NULL,
      "finished_at" DATETIME,
      "migration_name" VARCHAR(255) NOT NULL,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
      "applied_steps_count" INTEGER UNSIGNED NOT NULL DEFAULT 0
    )
  `);
  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS "_prisma_migrations_turso_active_name_key"
    ON "_prisma_migrations" ("migration_name")
    WHERE "rolled_back_at" IS NULL
  `);

  for (const migrationName of migrationDirectories) {
    const migrationPath = path.join(
      migrationsDirectory,
      migrationName,
      "migration.sql",
    );
    const migrationSql = await readFile(migrationPath, "utf8");
    const checksum = createHash("sha256").update(migrationSql).digest("hex");
    const history = await client.execute({
      sql: `
        SELECT "id", "checksum", "finished_at"
        FROM "_prisma_migrations"
        WHERE "migration_name" = ? AND "rolled_back_at" IS NULL
        ORDER BY "started_at" DESC
        LIMIT 1
      `,
      args: [migrationName],
    });
    const appliedMigration = history.rows[0];

    if (appliedMigration) {
      if (appliedMigration.checksum !== checksum) {
        throw new Error(
          `Migration ${migrationName} has changed since it was applied. Restore the original migration file or create a new migration.`,
        );
      }
      if (!appliedMigration.finished_at) {
        throw new Error(
          `Migration ${migrationName} previously failed and requires manual database recovery before deployment.`,
        );
      }
      console.log(`Turso migration already applied: ${migrationName}`);
      continue;
    }

    const migrationId = randomUUID();
    await client.execute({
      sql: `
        INSERT INTO "_prisma_migrations"
          ("id", "checksum", "migration_name", "applied_steps_count")
        VALUES (?, ?, ?, 0)
      `,
      args: [migrationId, checksum, migrationName],
    });

    console.log(`Applying Turso migration: ${migrationName}`);
    try {
      await client.executeMultiple(migrationSql);
      await client.execute({
        sql: `
          UPDATE "_prisma_migrations"
          SET "finished_at" = current_timestamp, "applied_steps_count" = 1
          WHERE "id" = ?
        `,
        args: [migrationId],
      });
    } catch (error) {
      await client.execute({
        sql: `UPDATE "_prisma_migrations" SET "logs" = ? WHERE "id" = ?`,
        args: [String(error), migrationId],
      });
      throw error;
    }
  }
} finally {
  client.close();
}
