import MongoDatastore from '@/src/datastore/MongoDatastore';
import protectApiRoute from '@/src/utils/protectApiRoute';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type MessagesQuery = {
    chatId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = await protectApiRoute(req, res); // use user_old to verify chat id
    const chatId = new ObjectId((req.query as MessagesQuery).chatId);

    const instance = await MongoDatastore.getInstance();

    if (req.method === "GET") {
        // return list of users
        res.status(200).json(await instance.messages.getMessages(chatId));
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}
