import dotenv from 'dotenv';
dotenv.config({
  path: "./.env.local"
});

import next from 'next';
import http from 'http';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NextServer } from 'next/dist/server/next';
import { Server as IOServer } from 'socket.io';
import chatHandler from './chat';

const nextApp: NextServer = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

const expressApp: Express = express();
const server = http.createServer(expressApp);
const port = process.env.PORT;

const io = new IOServer(server);

// middleware setup
expressApp.use(bodyParser.json());

// chat handler
chatHandler(expressApp, io);

// nextjs handler
expressApp.all("*", (req: Request, res: Response) => {
  return handle(req, res);
}); 

(async () => {
  await nextApp.prepare();

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();