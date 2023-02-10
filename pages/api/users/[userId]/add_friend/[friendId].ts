import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type AddFriendQueries = {
  userId: string,
  friendId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, friendId } = req.query as AddFriendQueries;
    const instance = await MongoDatastore.getInstance();

    await instance.users.addFriend(new ObjectId(userId), new ObjectId(friendId));

    res.json(await instance.users.getUser(new ObjectId(userId)));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
