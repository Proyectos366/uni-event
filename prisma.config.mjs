import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
    url:
      process.env.SQLITE_DATABASE_URL ??
      (process.env.DATABASE_URL?.startsWith("file:")
        ? process.env.DATABASE_URL
        : "file:./prisma/dev.db"),
  },
});
