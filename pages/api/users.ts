import MongoDatastore from '@/src/datastore/MongoDatastore';
import User from '@/src/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataStore = await MongoDatastore.getInstance();

  if (req.method === 'POST') {
    // register a user
    try {
      const createdUser: User = await dataStore.users.register(req.body.email, req.body.username);
      res.status(201).json(createdUser);
    } catch (exception) {
      res.status(500).json({
        message: (exception as Error).message,
      });
    }
  } else {
    // return list of users
    res.status(200).json((await dataStore.users.all()) || []);
  }
}
