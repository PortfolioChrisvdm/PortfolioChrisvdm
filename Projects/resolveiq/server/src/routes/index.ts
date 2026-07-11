import { Router } from "express";

import { authenticationRouter } from "../modules/authentication/authentication.routes.js";
import { healthRouter } from "./health.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authenticationRouter);
apiRouter.use("/health", healthRouter);