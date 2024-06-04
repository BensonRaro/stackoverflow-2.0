import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./drizzle/Schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});
