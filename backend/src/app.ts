import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes
from "./routes/auth.routes";

import tripRoutes
from "./routes/trip.routes";

import { errorHandler }
from "./middleware/error.middleware";

import {
  logger
} from "./middleware/logger.middleware";

import {
  apiLimiter
} from "./middleware/rateLimiter.middleware";

import healthRoutes
from "./routes/health.routes";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000",

    credentials: true
  })
);

app.use(helmet());

app.use(express.json());

app.get("/", (_, res) => {

  res.json({
    success: true,
    message:
      "AI Travel Planner API"
  });
});

app.get(
  "/health",
  (_, res) => {

    res.status(200).json({
      status: "healthy",

      uptime:
        process.uptime(),

      timestamp:
        new Date()
          .toISOString()
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/trips",
  tripRoutes
);

app.use(logger);

app.use(
  "/api",
  apiLimiter
);

app.use(
  "/health",
  healthRoutes
);

app.use(errorHandler);

export default app;