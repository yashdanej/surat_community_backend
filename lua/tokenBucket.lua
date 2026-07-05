local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local bucket = redis.call("HMGET", key, "tokens", "last")

local tokens = tonumber(bucket[1])
local last = tonumber(bucket[2])

if tokens == nil then
    tokens = capacity
    last = now
end

local delta = math.max(0, now - last)

tokens = math.min(capacity, tokens + delta * refillRate)

local allowed = 0

if tokens >= requested then
    tokens = tokens - requested
    allowed = 1
end

redis.call("HMSET", key,
    "tokens", tokens,
    "last", now
)

redis.call("EXPIRE", key, 120)

return {allowed, tokens}