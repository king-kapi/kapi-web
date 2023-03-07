import MongoDatastore from '@/src/datastore/MongoDatastore';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = await protectApiRoute(req, res);

    if (req.method === "GET") {
        const instance = await MongoDatastore.getInstance();

        // return list of users
        res.status(200).json(await instance.users.getUser(user._id));
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}
