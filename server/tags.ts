import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default async function tagsHandler(
  app: Express,
  prisma: PrismaClient) {

  // get all games
  app.get("/api/tags", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    const tags = await prisma.tag.findMany();
    res.status(200).send(tags);
  });

  app.post("/api/tags", async (req: Request, res: Response) => {
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

  app.delete("/api/tags/:tagId", async (req: Request, res: Response) => {
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
}