import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export default async function gamesHandler(
  app: Express,
  prisma: PrismaClient) {

  // get all games
  app.get("/api/games", async (req: Request, res: Response) => {
    const games = await prisma.game.findMany();
    res.status(200).send(games);
  });

  app.post("/api/games", async (req: Request, res: Response) => {
    try {
      const created = await prisma.game.create({
        data: req.body
      });
      res.status(201).send(created);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.delete("/api/games/:gameId", async (req: Request, res: Response) => {
    try {
      await prisma.game.delete({
        where: {
          id: req.params.gameId
        }
      });
      res.status(200).send("Successful");
    } catch (e) {
      res.status(400).send(e);
    }
  });
}