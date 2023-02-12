import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// todo bad af name
type UserPostQueries = {
    userId: string
};

type UserCreatePostBody = {
    _id: string,
    content: string
}

// responds with an array of friends and their status
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId } = req.query as UserPostQueries;
    const body = req.body as UserCreatePostBody;
    const instance = await MongoDatastore.getInstance();

    res.status(201).send(await instance.posts.create({
        _id: ObjectId(body.)
    }));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
