import app from "./app.js";
import { sql } from "./config/db.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";
import { loadLuaScript } from "./config/rateLimiter.js";
import { connectRedis } from "./config/redis.js";
async function initDB() {
  try {
    const result = await fetch("https://google.com");
    console.log("Google:", result.status);

    await sql`SELECT 1`;

    logger.info("Database connected");
  } catch (err) {
    console.dir(err, { depth: null });
    process.exit(1);
  }
}

async function startServer() {
    try {
        await connectRedis();
        await loadLuaScript();
        await initDB();
        app.listen(env.PORT, () => {
            logger.info(`Server running on port ${env.PORT}`);
        });
    } catch (err) {
        logger.error("Failed to start server", err);
        process.exit(1);
    }
}

startServer();