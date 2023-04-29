import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { LobbyParams } from "../[lobbyId]";

type SendRequestBody = {
  receiverId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "POST") {
    const lobbyId = new ObjectId((req.query as LobbyParams).lobbyId);
    const receiverId = new ObjectId((req.body as SendRequestBody).receiverId);

    await instance.lobbies.addRequest(lobbyId, user._id, receiverId);

    res.status(200).send("Request sent.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}