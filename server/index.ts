import dotenv from "dotenv";

dotenv.config({
  path: "./.env.local"
});

import next from "next";
import http from "http";
import express, { Express, Request, Response } from "express";
import { NextServer } from "next/dist/server/next";
import { Server as IOServer } from "socket.io";
import chatHandler from "./chat";
import userHandler from "./user";


const nextApp: NextServer = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

const server: Express = express();
const httpServer = http.createServer(server);
const port = process.env.PORT;

const io = new IOServer(httpServer);

// middleware setup

// chat handler
chatHandler(server, io);
userHandler(server);

// nextjs handler
server.use(async (req: Request, res: Response) => {
  return handle(req, res);
});

(async () => {
  await nextApp.prepare();

  httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();