import MongoDatastore from '@/src/datastore/MongoDatastore';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const instance = await MongoDatastore.getInstance();

        // return list of users
        res.status(200).json(await instance.users.getUser(new ObjectId(req.query.userId as string)));
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}
