import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default function gamesHandler(
  prisma: PrismaClient) {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const games = await prisma.game.findMany();
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const created = await prisma.game.create({
        data: req.body
      });
      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:gameId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      await prisma.game.delete({
        where: {
          id: req.params.gameId
        }
      });
      res.status(200).send("Successful");
    } catch (err) {
      next(err);
    }
  });

  return router;
}