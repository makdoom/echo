import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { configDotenv } from "dotenv";

configDotenv();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema, logger: true });

export type db = typeof db;
export default db;
