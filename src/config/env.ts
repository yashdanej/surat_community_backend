import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3000),

  DB_URL: z.url(),

  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),

  ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),

  REDIS_URL: z.url().optional(),

  KAFKA_BROKERS: z.string().optional(), // localhost:9092,localhost:9093

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  FRONTEND_URL: z.url().optional(),

  LOG_LEVEL: z
    .enum(["error", "warn", "info", "debug"])
    .default("info"),
});

export const env = envSchema.parse(process.env);