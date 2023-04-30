import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { LobbyParams } from "../[lobbyId]";

// body takes in a party
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "DELETE") {
    const lobbyId = new ObjectId((req.query as LobbyParams).lobbyId);
    const result = await instance.lobbies.leave(lobbyId, user._id);

    if (result.ok)
      res.status(200).send("Left lobby.");
    else {
      console.error(result.error);
      res.status(400).send(result.error);
    }
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}