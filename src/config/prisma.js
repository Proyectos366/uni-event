// src/lib/prisma.ts
import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import {
  getDatabaseProvider,
  getDirectPostgresDatabaseUrl,
  getSqliteDatabaseUrl,
} from "../../database.config.mjs";

const databaseProvider = getDatabaseProvider();
const postgresDatabaseUrl = getDirectPostgresDatabaseUrl();

if (databaseProvider === "postgresql" && !postgresDatabaseUrl) {
  throw new Error("Configura una URL de PostgreSQL antes de ejecutar el seed.");
}

const adapter =
  databaseProvider === "postgresql"
    ? new PrismaPg({ connectionString: postgresDatabaseUrl })
    : new PrismaLibSql(
        { url: getSqliteDatabaseUrl() },
        { timestampFormat: "unixepoch-ms" },
      );

export const prisma = new PrismaClient({ adapter });
