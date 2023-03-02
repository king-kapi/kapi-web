import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type AddFriendQueries = {
  userId: string,
  friendId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, friendId } = req.query as AddFriendQueries;
  const instance = await MongoDatastore.getInstance();
  if (req.method === "POST") {

    await instance.users.addFriend(new ObjectId(userId), new ObjectId(friendId));

    res.json(await instance.users.getUser(new ObjectId(userId)));
  } else if (req.method === "DELETE") {
    await instance.users.removeFriend(new ObjectId(userId), new ObjectId(friendId));

    res.status(202).send("Friend Removed");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
