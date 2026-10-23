import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getDatabaseProvider,
  getDirectPostgresDatabaseUrl,
} from "../database.config.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const isVercel = Boolean(process.env.VERCEL);
const databaseProvider = getDatabaseProvider();
const prismaConfig = path.join(
  projectRoot,
  databaseProvider === "postgresql"
    ? "prisma.postgresql.config.mjs"
    : "prisma.config.mjs",
);
const schema = path.join(
  projectRoot,
  "prisma",
  databaseProvider === "postgresql"
    ? "schema.postgresql.prisma"
    : "schema.prisma",
);

function run(script, args) {
  const result = spawnSync(
    process.execPath,
    [path.join(projectRoot, "node_modules", script), ...args],
    { cwd: projectRoot, env: process.env, stdio: "inherit" },
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("prisma/build/index.js", ["generate", "--schema", schema]);

if (databaseProvider === "postgresql") {
  if (!getDirectPostgresDatabaseUrl()) {
    throw new Error(
      "Configure a PostgreSQL connection URL before building with DATABASE_PROVIDER=postgresql.",
    );
  }
}

if (isVercel) {
  run("prisma/build/index.js", [
    "migrate",
    "deploy",
    "--config",
    prismaConfig,
  ]);
}

run("next/dist/bin/next", ["build"]);
