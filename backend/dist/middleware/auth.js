"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const prisma_1 = require("../lib/prisma");
const authenticateUser = async (req) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return false;
    }
    const token = header.replace("Bearer ", "");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        if (!decoded.sub || !decoded.email) {
            return false;
        }
        // Use email as the unique identifier since it's marked as @unique in the schema
        // Try to find existing user first, with error handling
        let user;
        try {
            user = await prisma_1.prisma.user.findFirst({
                where: { email: decoded.email },
            });
            if (!user) {
                // Create new user
                user = await prisma_1.prisma.user.create({
                    data: {
                        id: decoded.sub,
                        email: decoded.email,
                        name: decoded.name ?? null,
                        provider: "google",
                    },
                });
            }
            else {
                // Update existing user's name if it changed
                if (decoded.name && decoded.name !== user.name) {
                    user = await prisma_1.prisma.user.update({
                        where: { email: decoded.email },
                        data: {
                            name: decoded.name,
                        },
                    });
                }
            }
        }
        catch (dbError) {
            // If DB fails, still set user from token
            req.user = {
                id: decoded.sub,
                email: decoded.email ?? "",
                name: decoded.name ?? null,
            };
            return true;
        }
        req.user = {
            id: decoded.sub,
            email: user.email,
            name: user.name,
        };
        return true;
    }
    catch (err) {
        return false;
    }
};
const requireAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        console.error("[Auth] Missing or invalid Authorization header");
        console.error("[Auth] Received header:", header ? "exists but doesn't start with 'Bearer '" : "missing");
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = header.replace("Bearer ", "");
    console.log("[Auth] Received token:", {
        tokenLength: token.length,
        tokenPreview: token.substring(0, 30) + "...",
        secretLength: env_1.env.jwtSecret.length,
        secretPreview: env_1.env.jwtSecret.substring(0, 10) + "..."
    });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        console.log("[Auth] ✅ Token verified successfully:", {
            sub: decoded.sub,
            email: decoded.email,
            name: decoded.name
        });
        if (!decoded.sub) {
            console.error("[Auth] Token missing 'sub' field");
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!decoded.email) {
            console.error("[Auth] Token missing 'email' field");
            return res.status(401).json({ error: "Unauthorized" });
        }
        // Use email as the unique identifier since it's marked as @unique in the schema
        // Try to find existing user first, with error handling
        let user;
        try {
            // Try findFirst instead of findUnique (some Prisma adapters don't support findUnique)
            user = await prisma_1.prisma.user.findFirst({
                where: { email: decoded.email },
            });
            if (!user) {
                // Create new user
                user = await prisma_1.prisma.user.create({
                    data: {
                        id: decoded.sub,
                        email: decoded.email,
                        name: decoded.name ?? null,
                        provider: "google",
                    },
                });
                console.log("[Auth] Created new user:", user.email);
            }
            else {
                // Update existing user's name if it changed
                if (decoded.name && decoded.name !== user.name) {
                    user = await prisma_1.prisma.user.update({
                        where: { email: decoded.email },
                        data: {
                            name: decoded.name,
                        },
                    });
                }
            }
        }
        catch (dbError) {
            console.error("[Auth] Database error:", dbError.message);
            console.error("[Auth] Database error stack:", dbError.stack);
            // For now, allow the request to proceed even if DB fails
            // The user info from the token is sufficient for authentication
            req.user = {
                id: decoded.sub,
                email: decoded.email ?? "",
                name: decoded.name ?? null,
            };
            console.log("[Auth] Proceeding without DB user lookup");
            return next();
        }
        req.user = {
            id: decoded.sub,
            email: user.email,
            name: user.name,
        };
        console.log("[Auth] User authenticated:", user.email);
        return next();
    }
    catch (err) {
        console.error("[Auth] Token verification failed:", err.message);
        if (err.name === "JsonWebTokenError") {
            console.error("[Auth] JWT Error - token may be invalid or secret mismatch");
        }
        else if (err.name === "TokenExpiredError") {
            console.error("[Auth] Token expired");
        }
        return res.status(401).json({ error: "Unauthorized" });
    }
};
exports.requireAuth = requireAuth;
const optionalAuth = async (req, res, next) => {
    await authenticateUser(req);
    return next();
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.js.map