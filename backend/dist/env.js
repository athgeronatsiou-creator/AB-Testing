"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const required = (value, name) => {
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
};
// Parse CLIENT_ORIGIN - can be comma-separated string or single origin
const parseClientOrigin = () => {
    const origin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";
    if (origin.includes(",")) {
        return origin.split(",").map(o => o.trim()).filter(o => o.length > 0);
    }
    return origin;
};
exports.env = {
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
//# sourceMappingURL=env.js.map