import MongoDatastore from "@/src/datastore/MongoDatastore";
import Game from "@/src/types/Games";
import Lobby from "@/src/types/Lobby";
import { toUser } from "@/src/types/User";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { NextApiRequest, NextApiResponse } from "next";

export type CreateLobbyBody = {
  game: Game,
  maxSize: number
}

// body takes in a party
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  const instance = await MongoDatastore.getInstance();

  if (req.method === "GET") {
    res.status(200).json(await instance.lobbies.all())
  } else if (req.method === "POST") {
    // TODO: verify that user hasn't created another party
    const lobby: Omit<Lobby, "_id" | "chatId"> = {
      game: (req.body as CreateLobbyBody).game,
      host: toUser(user), 
      users: [toUser(user)],
      maxSize: (req.body as CreateLobbyBody).maxSize,
      resolvedRequests: [],
      requests: []
    }

    res.status(200).json(await instance.lobbies.create(lobby));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}