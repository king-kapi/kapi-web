import dotenv from "dotenv";
import next from "next";
import http from "http";
import express, { Express, NextFunction, Request, Response } from "express";
import { NextServer } from "next/dist/server/next";
import { Server as IOServer } from "socket.io";
import cookieParser from "cookie-parser";
import chatHandler from "./chat";
import usersHandler from "./users";
import { PrismaClient } from "@prisma/client";
import lobbiesHandler from "@/server/lobbies";
import gamesHandler from "@/server/games";
import tagsHandler from "@/server/tags";
import errorHandler from "@/server/errors";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

dotenv.config({
  path: "./.env.local"
});

const nextApp: NextServer = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT;

const io = new IOServer(server);

const prisma = new PrismaClient();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handlers
// authHandler(server);
chatHandler(prisma, io);
app.use("/api/users/", usersHandler(prisma));
app.use("/api/lobbies/", lobbiesHandler(prisma));
app.use("/api/tags/", tagsHandler(prisma));
app.use("/api/games/", gamesHandler(prisma));

// nextjs handler
app.use((req: Request, res: Response) => {
  return handle(req, res);
});

app.use(errorHandler);

(async () => {
  await nextApp.prepare();

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();