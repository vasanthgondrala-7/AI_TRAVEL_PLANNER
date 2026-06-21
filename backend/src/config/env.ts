import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",

  MONGO_URI: process.env.MONGO_URI || "",

  JWT_SECRET: process.env.JWT_SECRET || "",

  GEMINI_API_KEY:
    process.env.GEMINI_API_KEY || "",

  OPENWEATHER_API_KEY:
    process.env.OPENWEATHER_API_KEY || "",

  CLIENT_URL:
    process.env.CLIENT_URL || ""
};

export const validateEnv = () => {
  const required = [
    "MONGO_URI",
    "JWT_SECRET",
    "GEMINI_API_KEY",
    "CLIENT_URL"
  ];

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing ENV Variables: ${missing.join(", ")}`
    );
  }
};