import app from "./app.js";
import http from "http";
import { connectRedis, disconnectRedis } from "@/configs/redis.config.js";

const port = Number(process.env.PORT) || 3002;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectRedis();
  } catch (error) {
    console.error(`Failed to connect Redis: ${error}`);
    await disconnectRedis();
    process.exit(1);
  }

  server.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
};

let isShuttingDown = false;

const shutdown = (signal: NodeJS.Signals) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`${signal} received, closing server gracefully`);

  server.close(async () => {
    console.log("Server closed");
    await disconnectRedis();
    process.exit(0);
  });
};

server.on("error", async (error) => {
  console.error(`API error: ${error}`);
  await disconnectRedis();
  process.exit(1);
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

startServer();
