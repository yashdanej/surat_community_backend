import { redis } from "../config/redis.js";
import { getLuaSHA } from "../config/rateLimiter.js";
import { NextFunction, Request, Response } from "express";

const CAPACITY = 100;
const REFILL = 5;

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket.remoteAddress;

  const key = `bucket:${ip}`;

  const now = Date.now() / 1000;

  const [allowed, remaining]: any = await redis.evalSha(
    getLuaSHA(),
    {
      keys: [key],
      arguments: [
        CAPACITY.toString(),
        REFILL.toString(),
        now.toString(),
        "1",
      ],
    }
  );

  res.setHeader("X-RateLimit-Remaining", remaining);

  if (allowed === 0) {
    return res.status(429).json({
      success: false,
      message: "Too Many Requests",
    });
  }

  next();
}