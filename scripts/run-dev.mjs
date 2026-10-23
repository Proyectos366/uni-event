import "dotenv/config";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDirectPostgresDatabaseUrl } from "../database.config.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const databaseProvider = process.argv[2];

if (!["sqlite", "postgresql"].includes(databaseProvider)) {
  throw new Error("Indica el proveedor de desarrollo: sqlite o postgresql.");
}

const env = { ...process.env, DATABASE_PROVIDER: databaseProvider };

if (databaseProvider === "postgresql" && !getDirectPostgresDatabaseUrl(env)) {
  throw new Error(
    "Configura una URL de PostgreSQL antes de iniciar el modo Neon.",
  );
}

const config = path.join(
  projectRoot,
  databaseProvider === "postgresql"
    ? "prisma.postgresql.config.mjs"
    : "prisma.config.mjs",
);

function run(script, args) {
  const result = spawnSync(
    process.execPath,
    [path.join(projectRoot, script), ...args],
    { cwd: projectRoot, env, stdio: "inherit" },
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("node_modules/prisma/build/index.js", ["generate", "--config", config]);
run("node_modules/next/dist/bin/next", ["dev", ...process.argv.slice(3)]);
