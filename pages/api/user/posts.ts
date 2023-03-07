import MongoDatastore from '@/src/datastore/MongoDatastore';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { NextApiRequest, NextApiResponse } from 'next';

type UserCreatePostBody = {
    _id: string,
    content: string
}

// responds with an array of friends and their status
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  if (req.method === "POST") {
    const body = req.body as UserCreatePostBody;
    const instance = await MongoDatastore.getInstance();

    res.status(201).send("asdkjfhalsdkjfhasdjlkf");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
