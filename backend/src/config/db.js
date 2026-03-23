import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env.js";

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  // Work around local DNS resolvers that refuse SRV queries used by mongodb+srv.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");
}
