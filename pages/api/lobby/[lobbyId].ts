import MongoDatastore from "@/src/datastore/MongoDatastore";
import { NotHostError } from "@/src/errors/PartyErrors";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export type LobbyParams = {
  lobbyId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {user} = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();
  const lobbyId = new ObjectId((req.query as LobbyParams).lobbyId);
  const lobby = await instance.lobbies.get(lobbyId);

  if (req.method === "GET") {
    res.status(200).json(lobby);
  } else if (req.method === "DELETE") {
    // confirm user is host
    if (lobby.host._id?.toString() !== user._id.toString())
      res.status(400).json(new NotHostError(lobbyId, user._id));
    else {
      await instance.lobbies.delete(lobbyId);
      res.status(200).send("Lobby deleted.");
    }
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}