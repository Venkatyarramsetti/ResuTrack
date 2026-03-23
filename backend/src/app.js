import cors from "cors";
import express from "express";
import analysisRoutes from "./routes/analysisRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoutes);
app.use("/", authRoutes);
app.use("/", analysisRoutes);
app.use("/", queryRoutes);

export default app;
