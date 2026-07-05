import fs from "fs/promises";
import path from "path";
import { redis } from "./redis.js";

let scriptSHA = "";

export async function loadLuaScript() {
  const script = await fs.readFile(
    path.join(process.cwd(), "lua/tokenBucket.lua"),
    "utf8"
  );

  scriptSHA = await redis.scriptLoad(script);
}

export function getLuaSHA() {
  return scriptSHA;
}