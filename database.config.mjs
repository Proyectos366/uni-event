export function getDatabaseProvider(env = process.env) {
  return env.VERCEL || env.DATABASE_PROVIDER === "postgresql"
    ? "postgresql"
    : "sqlite";
}

function firstPostgresUrl(...urls) {
  return urls.find(
    (url) =>
      url?.startsWith("postgres://") || url?.startsWith("postgresql://"),
  );
}

export function getPostgresDatabaseUrl(env = process.env) {
  return firstPostgresUrl(
    env.POSTGRES_PRISMA_URL,
    env.POSTGRES_URL,
    env.POSTGRES_URL_NON_POOLING,
    env.DIRECT_URL,
    env.DATABASE_URL,
  );
}

export function getDirectPostgresDatabaseUrl(env = process.env) {
  return firstPostgresUrl(
    env.DIRECT_URL,
    env.POSTGRES_URL_NON_POOLING,
    env.POSTGRES_URL,
    env.POSTGRES_PRISMA_URL,
    env.DATABASE_URL,
  );
}

export function getSqliteDatabaseUrl(env = process.env) {
  return (
    env.SQLITE_DATABASE_URL ||
    (env.DATABASE_URL?.startsWith("file:")
      ? env.DATABASE_URL
      : "file:./prisma/dev.db")
  );
}
