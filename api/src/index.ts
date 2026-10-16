import app from "./app.js";
import http from "http";

const port = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

const closeServer = () => {
  console.log("Server closed");
  process.exit(0);
};

server.on("error", (error) => {
  console.error(`API error: ${error}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server gracefully");
  server.close(() => {
    closeServer();
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, closing server gracefully");
  server.close(() => {
    closeServer();
  });
});