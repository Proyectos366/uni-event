import "dotenv/config";
import { defineConfig } from "prisma/config";
import { getDirectPostgresDatabaseUrl } from "./database.config.mjs";

export default defineConfig({
  schema: "prisma/schema.postgresql.prisma",
  migrations: {
    path: "prisma/migrations-postgresql",
    seed: "npm run prisma:seed:postgres",
  },
  datasource: { url: getDirectPostgresDatabaseUrl() },
});
