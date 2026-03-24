import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";

const app = express();

const fallbackOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const allowedOrigins = new Set([...env.frontendUrls, ...fallbackOrigins]);

app.use(helmet());
app.use(morgan("dev"));
app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.has(origin)) {
				return callback(null, true);
			}

			return callback(new Error(`CORS blocked for origin: ${origin}`));
		},
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", healthRoutes);
app.use("/api", apiLimiter);
app.use("/api", authRoutes);
app.use("/api", analysisRoutes);
app.use("/api", queryRoutes);

app.use(errorHandler);

export default app;
