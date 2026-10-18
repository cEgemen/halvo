import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redis.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting");
});

const connectRedis = async () => {
  await redis.connect();
  console.log("Redis connected");
};

const disconnectRedis = async () => {
  if (redis.status === "end") return;

  try {
    await redis.quit();
  } catch {
    redis.disconnect();
  }
  console.log("Redis disconnected");
};

export { redis, connectRedis, disconnectRedis };
