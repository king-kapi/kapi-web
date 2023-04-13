import MongoDatastore from "@/src/datastore/MongoDatastore";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { PartyParams } from "../[partyId]";

type SendRequestBody = {
  receiverId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "POST") {
    const partyId = new ObjectId((req.query as PartyParams).partyId);
    const receiverId = new ObjectId((req.body as SendRequestBody).receiverId);

    await instance.parties.addRequest(partyId, user._id, receiverId);

    res.status(200).send("Request sent.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}