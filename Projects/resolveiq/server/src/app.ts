import cors from "cors";
import express from "express";
import helmet from "helmet";

import { apiRouter } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
  app.use(express.json());

  app.use("/api/v1", apiRouter);

  return app;
};