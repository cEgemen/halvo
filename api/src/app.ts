import express from "express";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import healthRouter from "./routes/health.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
