import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default async function lobbiesHandler(
  app: Express,
  prisma: PrismaClient) {
  app.get("/api/lobbies", async (req: Request, res: Response) => {
    try {
      const lobbies = await prisma.lobby.findMany({
        include: {
          users: true
        }
      });
      res.status(200).send(lobbies);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  app.post("/api/lobbies", async (req: Request, res: Response) => {
    const session = await protectApiRoute(req, res);

    try {
      const created = await prisma.lobby.create({
        data: {
          ...req.body,
          hostId: session.id
        }
      });

      // create relation between party and user
      await prisma.user.update({
        where: {
          id: session.id
        },
        data: {
          lobbyId: created.id
        }
      });

      res.status(201).send(created);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });
}