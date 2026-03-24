import dotenv from "dotenv";

dotenv.config();

const requiredVars = [
  "MONGO_URI",
  "GROQ_API_KEY",
  "EMAIL_USER",
  "EMAIL_PASS",
  "JWT_SECRET",
  "CLOUD_NAME",
  "CLOUD_API_KEY",
  "CLOUD_API_SECRET",
  "FRONTEND_URL",
];

for (const key of requiredVars) {
  if (!process.env[key]) {
    console.warn(`[env] Missing environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  groqApiKey: process.env.GROQ_API_KEY,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendUrls: (process.env.FRONTEND_URL || "")
    .split(",")
    .map((url) => url.trim().replace(/\/$/, ""))
    .filter((url) => url && url !== "*"),
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_API_SECRET,
  },
};
