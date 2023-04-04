import dotenv from 'dotenv';
dotenv.config({
  path: "./.env.local"
});

import express, { Express } from 'express';
import bodyParser from 'body-parser';
// import UserRoutes from './users/user-routes';

const app: Express = express();
const port = process.env.PORT;

// middleware setup
app.use(bodyParser.json());

// UserRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// make it a module
export {};