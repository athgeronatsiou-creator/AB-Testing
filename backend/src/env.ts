import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

// Parse CLIENT_ORIGIN - can be comma-separated string or single origin
const parseClientOrigin = (): string | string[] => {
  const origin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";
  if (origin.includes(",")) {
    return origin.split(",").map(o => o.trim()).filter(o => o.length > 0);
  }
  return origin;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseInt(process.env.PORT ?? "4000", 10),
  databaseUrl: required(process.env.DATABASE_URL, "DATABASE_URL"),
  jwtSecret: required(process.env.JWT_SECRET, "JWT_SECRET"),
  clientOrigin: parseClientOrigin(),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  },
};


