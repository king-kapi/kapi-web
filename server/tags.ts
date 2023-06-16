import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default function tagsHandler(
  prisma: PrismaClient) {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    const tags = await prisma.tag.findMany();
    res.status(200).send(tags);
  });

  router.post("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    try {
      const created = await prisma.tag.create({
        data: req.body
      });
      res.status(201).send(created);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  router.delete("/:tagId", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    try {
      await prisma.tag.delete({
        where: {
          id: req.params.tagId
        }
      });
      res.status(200).send("Successful");
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  return router;
}