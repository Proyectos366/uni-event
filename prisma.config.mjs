import "dotenv/config";
import { defineConfig } from "prisma/config";
import { getSqliteDatabaseUrl } from "./database.config.mjs";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npm run prisma:seed:sqlite",
  },
  datasource: {
    url: getSqliteDatabaseUrl(),
  },
});
