import MongoDatastore from "@/src/datastore/MongoDatastore";
import Party from "@/src/types/Party";
import User from "@/src/types/User";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { NextApiRequest, NextApiResponse } from "next";

export type CreatePartyBody = {
  game: string,
  maxSize: number
}

// body takes in a party
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "GET") {
    res.status(200).json(await instance.parties.all())
  } else if (req.method === "POST") {
    const party: Party = {
      game: (req.body as CreatePartyBody).game,
      host: user,
      users: [],
      maxSize: (req.body as CreatePartyBody).maxSize
    }

    res.status(200).json(await instance.parties.create(party));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}