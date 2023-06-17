import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";
import DoesNotExist from "@/src/errors/DoesNotExist";
import { CannotKickHost, NotHostError, NotInLobbyError } from "@/src/errors/LobbyErrors";

export interface LobbyParams {
  lobbyId: string;
}

export default function lobbiesHandler(
  prisma: PrismaClient) {
  const router = Router();
  router.get("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    const lobbies = await prisma.lobby.findMany({
      include: {
        users: true
      }
    });

    res.status(200).send(lobbies);
  });

  router.post("/", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res)).id;

    const created = await prisma.lobby.create({
      data: {
        ...req.body,
        hostId: userId
      }
    });

    // create relation between party and user
    await prisma.user.update({
      where: { id: userId },
      data: { lobbyId: created.id }
    });

    res.status(201).send(created);
  });

  // Get lobby information
  router.get("/:lobbyId", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res)).id;
    const { lobbyId } = req.params;

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

    // if no lobby
    if (!lobby)
      throw new DoesNotExist(lobbyId, "lobbies");

    // if user is not in the party, remove requests
    // TODO: consider just removing the field altogether
    if (lobby.users.filter(u => u.id === userId).length === 0)
      lobby.requests = [];

    res.status(200).send(lobby);
  });

  router.delete("/:lobbyId", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res))?.id;
    const { lobbyId } = req.params;

    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId }
    });

    if (!lobby)
      throw new DoesNotExist(lobbyId, "lobbies");
    if (lobby.hostId !== userId)
      throw new NotHostError(lobbyId, userId);

    await prisma.lobby.delete({
      where: { id: lobbyId }
    });

    res.status(200).send("Successful");
  });

  // host only
  router.post("/:lobbyId/kick/:kickId", async (req: Request, res: Response) => {
    const { id } = await protectApiRoute(req, res);
    const { lobbyId, kickId } = req.params;

    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId },
      include: { users: true }
    });

    if (!lobby)
      throw new DoesNotExist(lobbyId, "lobbies");
    if (lobby.hostId === kickId)
      throw new CannotKickHost(lobbyId, kickId);
    if (lobby.hostId !== id)
      throw new NotHostError(lobbyId, id);

    if (lobby.users.filter(user => user.id === kickId).length === 0)
      throw new NotInLobbyError(lobbyId, kickId);

    await prisma.user.update({
      where: { id: kickId },
      data: { lobbyId: null }
    });

    res.status(200).send("Successful");
  });

  router.post("/:lobbyId/request", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res)).id;
    const { lobbyId } = req.params;

    const lobby = prisma.lobby.findUnique({ where: { id: lobbyId } });
    const user = prisma.user.findUnique({ where: { id: userId } });

    if (!lobby) // check if lobby exists
      throw new DoesNotExist(lobbyId, "lobbies");
    if (!user) // check if user exists
      throw new DoesNotExist(userId, "users");

    const created = await prisma.lobbyRequest.create({
      data: {
        lobbyId: req.params.lobbyId,
        senderId: userId,
        message: req.body.message
      }
    });

    res.status(201).send(created);
  });

  // Host accepts request
  router.post("/:lobbyId/request/:requestId/accept", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res))?.id;
    const { lobbyId, requestId } = req.params;

    // verify host
    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId }
    });

    if (!lobby) // check lobby
      throw new DoesNotExist(lobbyId, "lobbies");
    if (lobby.hostId !== userId) // check is host
      throw new NotHostError(lobbyId, userId);

    // delete request
    const request = await prisma.lobbyRequest.delete({
      where: { id: requestId }
    });

    // add user to lobby
    const user = await prisma.user.update({
      where: { id: request.senderId },
      data: { lobbyId: lobbyId }
    });

    res.status(200).send(user);
  });

  // Host denies request
  router.post("/:lobbyId/request/:requestId/deny", async (req: Request, res: Response) => {
    const userId = (await protectApiRoute(req, res))?.id;
    const { lobbyId, requestId } = req.params;

    // verify host
    const lobby = await prisma.lobby.findUnique({
      where: { id: lobbyId }
    });

    if (!lobby) // check lobby
      throw new DoesNotExist(lobbyId, "lobbies");
    if (lobby.hostId !== userId) // check is host
      throw new NotHostError(lobbyId, userId);

    // delete request
    await prisma.lobbyRequest.delete({
      where: { id: requestId }
    });

    res.status(200).send("Successful");
  });

  return router;
}