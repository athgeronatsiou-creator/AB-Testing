"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types/express.d.ts" />
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const env_1 = require("./env");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: env_1.env.clientOrigin,
        methods: ["GET", "POST"],
    },
});
app.set("io", io);
io.on("connection", (socket) => {
    socket.on("join-test", (testId) => {
        socket.join(`test:${testId}`);
    });
});
app.use((0, cors_1.default)({
    origin: env_1.env.clientOrigin,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "2mb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.use((err, req, res, _next) => {
    console.error("[Global Error Handler] Unhandled error:", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
    });
    res.status(500).json({
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});
server.listen(env_1.env.port, () => {
    console.log(`API listening on port ${env_1.env.port}`);
});
//# sourceMappingURL=index.js.map