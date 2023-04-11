import MongoDatastore from "@/src/datastore/MongoDatastore";
import { NotHostError } from "@/src/errors/PartyErrors";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export type PartyParams = {
  partyId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {user} = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();
  const partyId = new ObjectId((req.query as PartyParams).partyId);;
  const party = await instance.parties.get(partyId);

  if (req.method === "GET") {
    res.status(200).json(party);
  } else if (req.method === "DELETE") {
    // confirm user is host
    if (party.host._id?.toString() !== user._id.toString())
      res.status(400).json(new NotHostError(partyId, user._id));
    else {
      await instance.parties.delete(partyId);
      res.status(200).send("Party deleted.");
    }
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}