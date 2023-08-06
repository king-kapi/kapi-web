import dotenv from "dotenv";
import next from "next";
import http from "http";
import express, { Express, Request, Response } from "express";
import { NextServer } from "next/dist/server/next";
import { Server as IOServer } from "socket.io";
import cookieParser from "cookie-parser";
import errorHandler from "@/src/errors";
import mongoose from "mongoose";
import usersHandler from "@/src/users";
import lobbiesHandler from "@/src/lobbies";
import gamesHandler from "@/src/games";
import tagsHandler from "@/src/tags";
import chatHandler from "@/src/chat";

dotenv.config({
  path: "./.env.local"
});

const nextApp: NextServer = next({ dev: process.env.NODE_ENV !== "production" });
const nextHandler = nextApp.getRequestHandler();

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT;

const io = new IOServer(server);

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handlers
// authHandler(server);
app.use("/api/chats/", chatHandler(io));
app.use("/api/users/", usersHandler());
app.use("/api/lobbies/", lobbiesHandler());
app.use("/api/tags/", tagsHandler());
app.use("/api/games/", gamesHandler());

// nextjs handler
app.use((req: Request, res: Response) => {
  nextHandler(req, res);
});

app.use(errorHandler);

(async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
  await nextApp.prepare();

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();