import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { PartyParams } from "../[lobbyId]";

// body takes in a party
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "DELETE") {
    const partyId = new ObjectId((req.query as PartyParams).partyId);
    const result = await instance.lobbies.leave(partyId, user._id);

    if (result.ok)
      res.status(200).send("Left party.");
    else
      res.status(400).send(result.error);
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}