import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis;
const isVercel = Boolean(process.env.VERCEL);
const sqliteDatabaseUrl =
  process.env.SQLITE_DATABASE_URL ??
  (process.env.DATABASE_URL?.startsWith("file:")
    ? process.env.DATABASE_URL
    : "file:./prisma/dev.db");
const postgresDatabaseUrl =
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL;

if (isVercel && !postgresDatabaseUrl) {
  throw new Error(
    "Set a PostgreSQL URL in Vercel (POSTGRES_PRISMA_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING, DIRECT_URL, or DATABASE_URL).",
  );
}

const adapter = isVercel
  ? new PrismaPg({ connectionString: postgresDatabaseUrl })
  : new PrismaLibSql(
      { url: sqliteDatabaseUrl },
      { timestampFormat: "unixepoch-ms" },
    );

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}