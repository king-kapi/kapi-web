import MongoDatastore from '@/src/datastore/MongoDatastore';
import UserStatus from '@/src/enums/UserStatus';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { NextApiRequest, NextApiResponse } from 'next';

interface StatusUpdateBody {
  status: UserStatus
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await protectApiRoute(req, res);

  if (req.method === "GET") { // respond with status
    const instance = await MongoDatastore.getInstance();

    res.json(await instance.users.getFriends(user._id));
  } else if (req.method === "PUT") {
    const {status} = req.body as StatusUpdateBody;
    const instance = await MongoDatastore.getInstance();
    
    await instance.users.setStatus(user._id, status);
    res.status(200).send("Status Updated.");
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
