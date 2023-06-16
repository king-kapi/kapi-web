import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default function gamesHandler(
  prisma: PrismaClient) {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    const games = await prisma.game.findMany();
    res.status(200).send(games);
  });

  router.post("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    try {
      const created = await prisma.game.create({
        data: req.body
      });
      res.status(201).send(created);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete("/:gameId", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

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

  return router;
}