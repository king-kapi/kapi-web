import dotenv from 'dotenv';
dotenv.config({
  path: "./.env.local"
});

import next from 'next';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NextServer } from 'next/dist/server/next';
// import UserRoutes from './users/user-routes';

// prepare next app then start express server
(async () => {
  const app: NextServer = next({ dev: process.env.NODE_ENV !== "production" });
  const handle = app.getRequestHandler();

  console.log('Launching next server');
  await app.prepare();

  console.log('Staring express server')
  const server: Express = express();
  const port = process.env.PORT;

  // middleware setup
  server.use(bodyParser.json());

  // UserRoutes(app);

  // nextjs handler
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();