import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import {
  getDatabaseProvider,
  getPostgresDatabaseUrl,
  getSqliteDatabaseUrl,
} from "../../database.config.mjs";

const globalForPrisma = globalThis;
const databaseProvider = getDatabaseProvider();
const postgresDatabaseUrl = getPostgresDatabaseUrl();

if (databaseProvider === "postgresql" && !postgresDatabaseUrl) {
  throw new Error(
    "Set a PostgreSQL URL (POSTGRES_PRISMA_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING, DIRECT_URL, or DATABASE_URL) when DATABASE_PROVIDER=postgresql.",
  );
}

const adapter = databaseProvider === "postgresql"
  ? new PrismaPg({ connectionString: postgresDatabaseUrl })
  : new PrismaLibSql(
      { url: getSqliteDatabaseUrl() },
      { timestampFormat: "unixepoch-ms" },
    );

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}