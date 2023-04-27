import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { PartyParams } from "../[lobbyId]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "POST") {
    const partyId = new ObjectId((req.query as PartyParams).partyId);

    await instance.lobbies.removeRequest(partyId, user._id);

    res.status(200).send("Denied request.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}