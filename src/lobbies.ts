import { NextFunction, Request, Response, Router } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import DoesNotExist from "@/src/errors/DoesNotExist";
import { AlreadyInLobbyError, CannotKickHost, NotHostError, NotInLobbyError } from "@/src/errors/LobbyErrors";
import Lobby from "@/src/models/Lobby";
import User from "@/src/models/User";
import mongoose from "mongoose";
import LobbyRequest, { ILobbyRequest } from "@/src/models/LobbyRequest";

export interface LobbyParams {
  lobbyId: string;
}

export default function lobbiesHandler() {
  const router = Router();
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const lobbies = await Lobby.find();

      res.status(200).send(lobbies);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res)).id;

      const user = await User.findById(userId);
      if (user.lobby)
        throw new AlreadyInLobbyError(userId, user.lobby);

      const created = await Lobby.create({
        ...req.body,
        hostId: userId,
        users: [userId]
      });

      // also update the user
      await User.findByIdAndUpdate(userId, {
        lobby: created._id
      });

      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  // // Get lobby information
  router.get("/:lobbyId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res)).id;
      const { lobbyId } = req.params;

      const lobby = await Lobby.findById(lobbyId)
        .populate("users", "_id username tag bio status")
        .populate({
          path: "requests",
          populate: [{
            path: "sender"
          }, {
            path: "lobby"
          }]
        })
        .exec();

      // if no lobby
      if (!lobby)
        throw new DoesNotExist(lobbyId, "lobbies");

      // if user_old is not in the party, remove requests
      // TODO: consider just removing the field altogether
      // if (lobby.users.filter(u => u.id === userId).length === 0)
      //   lobby.requests = [];

      res.status(200).send(lobby);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:lobbyId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res))?.id;
      const { lobbyId } = req.params;

      const lobby = await Lobby.findById(lobbyId);

      if (!lobby)
        throw new DoesNotExist(lobbyId, "lobbies");
      if (lobby.hostId.toString() !== userId)
        throw new NotHostError(lobbyId, userId);

      for (const userId of lobby.users) {
        await User.findByIdAndUpdate(userId, {
          $unset: {
            lobby: true
          }
        });
      }

      await Lobby.deleteOne({
        _id: lobbyId
      });

      res.status(200).send("Successful");
    } catch (err) {
      next(err);
    }
  });

  // host only
  router.post("/:lobbyId/:kickId/kick", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);
      const { lobbyId, kickId } = req.params;

      const lobby = await Lobby.findById(lobbyId);

      if (!lobby)
        throw new DoesNotExist(lobbyId, "lobbies");
      if (lobby.hostId.toString() === kickId)
        throw new CannotKickHost(lobbyId, kickId);
      if (lobby.hostId.toString() !== id)
        throw new NotHostError(lobbyId, id);

      if (lobby.users.filter((user: mongoose.Types.ObjectId) => user.toString() === kickId).length === 0)
        throw new NotInLobbyError(lobbyId, kickId);

      const updated = await Lobby.findByIdAndUpdate(lobbyId, {
        $pull: {
          users: kickId
        }
      }, { new: true });

      res.status(200).send(updated);
    } catch (err) {
      next(err);
    }
  });

  router.post("/:lobbyId/request", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res)).id;
      const { lobbyId } = req.params;

      const lobby = await Lobby.findById(lobbyId).populate("requests", "sender");
      const user = await User.findById(userId);

      if (!lobby) // check if lobby exists
        throw new DoesNotExist(lobbyId, "lobbies");
      if (!user) // check if user_old exists
        throw new DoesNotExist(userId, "users");
      if (lobby.requests.filter((request: ILobbyRequest) => request.sender.toString() === userId).length > 0) {
        throw "yuh ur in here alr bud";
      }

      const created = await LobbyRequest.create({
        lobby: lobbyId,
        sender: userId,
        message: req.body.message || "Default message."
      });

      const updated = await Lobby.findByIdAndUpdate(lobbyId, {
        $push: {
          requests: created._id
        }
      }, { new: true });

      res.status(201).send({
        request: created,
        lobby: updated
      });
    } catch (err) {
      next(err);
    }
  });

  // Host accepts request
  router.post("/:lobbyId/request/:requestId/accept", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res))?.id;
      const { lobbyId, requestId } = req.params;

      // verify host
      const lobby = await Lobby.findById(lobbyId);

      if (!lobby) // check lobby
        throw new DoesNotExist(lobbyId, "lobbies");
      if (lobby.hostId.toString() !== userId) // check is host
        throw new NotHostError(lobbyId, userId);

      // delete request
      const request = await LobbyRequest.findById(requestId);
      await LobbyRequest.deleteOne({
        _id: requestId
      });

      // add user to lobby
      const updatedLobby = await Lobby.findByIdAndUpdate(lobbyId, {
        $push: {
          users: request.sender
        }
      }, { new: true });
      const updatedUser = await User.findByIdAndUpdate(request, {
        lobby: lobbyId
      });

      res.status(200).send({
        lobby: updatedLobby
      });
    } catch (err) {
      next(err);
    }
  });

  // Host denies request
  router.post("/:lobbyId/request/:requestId/deny", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (await protectApiRoute(req, res))?.id;
      const { lobbyId, requestId } = req.params;

      // verify host
      const lobby = await Lobby.findById(lobbyId);

      if (!lobby) // check lobby
        throw new DoesNotExist(lobbyId, "lobbies");
      if (lobby.hostId.toString() !== userId) // check is host
        throw new NotHostError(lobbyId, userId);

      // delete request
      const request = await LobbyRequest.findById(requestId);
      await LobbyRequest.deleteOne({
        _id: requestId
      });

      res.status(200).send("Success");
    } catch (err) {
      next(err);
    }
  });

  return router;
}