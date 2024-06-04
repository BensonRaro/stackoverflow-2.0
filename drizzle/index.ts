import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "@/drizzle/Schema";

export async function Drizzle() {
  const connection = await mysql.createConnection({
    uri: process.env.DB_URL,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  return db;
}
