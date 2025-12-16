/// <reference path="./types/express.d.ts" />
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { env } from "./env";
import routes from "./routes";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.clientOrigin,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("join-test", (testId: string) => {
    socket.join(`test:${testId}`);
  });
});

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.use("/api", routes);

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
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

server.listen(env.port, () => {
  console.log(`API listening on port ${env.port}`);
});


