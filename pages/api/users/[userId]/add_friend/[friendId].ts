import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const instance = await MongoDatastore.getInstance();
    const userId = new ObjectId(req.query.userId as string);
    const friendId = new ObjectId(req.query.friendId as string);

    await instance.users.addFriend(userId, friendId);

    res.json(await instance.users.getUser(userId));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
