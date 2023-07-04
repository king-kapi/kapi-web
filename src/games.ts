import { Router, Request, Response, NextFunction } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import Game from "@/src/models/Games";

export default function gamesHandler() {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const games = await Game.find();
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const created = await Game.create({
        ...req.body
      });
      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:gameId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      await Game.deleteOne({
        _id: req.params.gameId
      });
      res.status(200).send("Successful");
    } catch (err) {
      next(err);
    }
  });

  return router;
}