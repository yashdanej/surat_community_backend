import { createClient } from "redis";
import { env } from "./env.js";
import logger from "./logger.js";

export const redis = createClient({
  url: env.REDIS_URL,
  socket: {
    connectTimeout: 10_000,
    keepAlive: true,
    noDelay: true,
    reconnectStrategy(retries) {
      return Math.min(retries * 100, 3000);
    },
  },
});

redis.on("connect", () => logger.info("Redis connected"));
redis.on("error", (err) => logger.error(err));
redis.on("reconnecting", () => logger.warn("Redis reconnecting"));

export async function connectRedis() {
  await redis.connect();
}