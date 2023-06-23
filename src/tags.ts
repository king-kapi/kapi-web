import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default function tagsHandler(
  prisma: PrismaClient) {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const tags = await prisma.tag.findMany();
      res.status(200).send(tags);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const created = await prisma.tag.create({
        data: req.body
      });
      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:tagId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      await prisma.tag.delete({
        where: {
          id: req.params.tagId
        }
      });
      res.status(200).send("Successful");
    } catch (err) {
      next(err);
    }
  });

  return router;
}