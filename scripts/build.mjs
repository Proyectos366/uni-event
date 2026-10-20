import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const isVercel = Boolean(process.env.VERCEL);
const prismaConfig = path.join(projectRoot, "prisma.postgresql.config.mjs");
const schema = path.join(
  projectRoot,
  "prisma",
  isVercel ? "schema.postgresql.prisma" : "schema.prisma",
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

if (isVercel) {
  const hasPostgresUrl = [
    "DIRECT_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "DATABASE_URL",
  ].some((name) => process.env[name]);

  if (!hasPostgresUrl) {
    throw new Error(
      "Configure a PostgreSQL connection URL in Vercel before deploying.",
    );
  }

  run("prisma/build/index.js", [
    "migrate",
    "deploy",
    "--config",
    prismaConfig,
  ]);
}

run("next/dist/bin/next", ["build"]);
