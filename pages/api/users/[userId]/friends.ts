import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type GetFriendsQueries = {
  userId: string,
}

// responds with an array of friends and their status
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { userId } = req.query as GetFriendsQueries;
    const instance = await MongoDatastore.getInstance();

    res.json(await instance.users.getFriends(new ObjectId(userId)));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
