import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis;
const tursoDatabaseUrl = process.env.TURSO_DATABASE_URL || undefined;

const databaseUrl =
  tursoDatabaseUrl ??
  process.env.DATABASE_URL ??
  "file:./prisma/dev.db";

if (process.env.VERCEL && !tursoDatabaseUrl) {
  throw new Error(
    "TURSO_DATABASE_URL must be set on Vercel; local SQLite files are not persistent there.",
  );
}

if (tursoDatabaseUrl && !process.env.TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_AUTH_TOKEN must be set when using Turso.");
}

const adapter = new PrismaLibSql(
  {
    url: databaseUrl,
    authToken: tursoDatabaseUrl
      ? process.env.TURSO_AUTH_TOKEN
      : undefined,
  },
  { timestampFormat: "unixepoch-ms" },
);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}