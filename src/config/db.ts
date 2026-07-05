import { neon } from "@neondatabase/serverless";
import { env } from "./env.js";

export const sql = neon(env.DB_URL as string);