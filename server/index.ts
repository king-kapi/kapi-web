import dotenv from "dotenv";
import next from "next";
import http from "http";
import express, { Express, Request, Response } from "express";
import { NextServer } from "next/dist/server/next";
import { Server as IOServer } from "socket.io";
import cookieParser from "cookie-parser";
import chatHandler from "./chat";
import userHandler from "./user";
import { PrismaClient } from "@prisma/client";
import partiesHandler from "@/server/parties";
import gamesHandler from "@/server/games";
import tagsHandler from "@/server/tags";

dotenv.config({
  path: "./.env.local"
});

// import authHandler from "@/server/auth";


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
chatHandler(app, prisma, io);
userHandler(app, prisma);
partiesHandler(app, prisma);
tagsHandler(app, prisma);
gamesHandler(app, prisma);

// nextjs handler
app.use(async (req: Request, res: Response) => {
  return handle(req, res);
});

(async () => {
  await nextApp.prepare();

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();