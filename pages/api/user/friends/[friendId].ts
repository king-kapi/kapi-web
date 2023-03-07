import MongoDatastore from '@/src/datastore/MongoDatastore';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type AddFriendQueries = {
  friendId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (await protectApiRoute(req, res)).user._id;
  const { friendId } = req.query as AddFriendQueries;
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
