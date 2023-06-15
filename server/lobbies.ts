import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";
import DoesNotExist from "@/src/errors/DoesNotExist";

export default async function lobbiesHandler(
  app: Express,
  prisma: PrismaClient) {
  app.get("/api/lobbies", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

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

  app.get("/api/lobbies/:lobbyId", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);
    try {
      const lobby = await prisma.lobby.findUnique({
        where: {
          id: req.params.lobbyId
        },
        include: {
          users: true,
          requests: {
            include: {
              sender: true
            }
          }
        }
      });

      res.status(200).send(lobby);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  app.delete("/api/lobbies/:lobbyId", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);
    try {
      const lobby = await prisma.lobby.findUnique({
        where: {
          id: req.params.lobbyId
        }
      });

      if (!lobby)
        throw new DoesNotExist(req.params.lobbyId, "lobbies");

      await prisma.lobby.delete({
        where: {
          id: req.params.lobbyId
        }
      });

      res.status(200).send("Successful");
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  app.post("/api/lobbies/:lobbyId/send-request", async (req: Request, res: Response) => {
    const { id } = await protectApiRoute(req, res);
    try {
      // TODO: check if lobby and receiver exists
      const created = await prisma.lobbyRequest.create({
        data: {
          lobbyId: req.params.lobbyId,
          senderId: id,
          message: req.body.message
        }
      });

      res.status(201).send(created);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });
}