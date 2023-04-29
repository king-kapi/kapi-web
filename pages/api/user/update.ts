import MongoDatastore from '@/src/datastore/MongoDatastore';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  if (req.method === "PUT") {
    const instance = await MongoDatastore.getInstance();
    
    // TODO: make sure this endpoitn can only update bio or username
    await instance.users.update(user._id, req.body);
    res.status(200).send("User Updated.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
