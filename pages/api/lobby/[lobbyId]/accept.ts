import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { LobbyParams } from "../[lobbyId]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "POST") {
    const lobbyId = new ObjectId((req.query as LobbyParams).lobbyId);

    await instance.lobbies.removeRequest(lobbyId, user._id);
    await instance.lobbies.join(lobbyId, user._id);

    res.status(200).send("Added to lobby.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}