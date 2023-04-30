import MongoDatastore from "@/src/datastore/MongoDatastore";
import User from "@/src/types/User";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// todo this transforming logic can be extracted
type NewChatBody = {
    users: User[] | {
        _id: string
    }[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await protectApiRoute(req, res);

    const instance = await MongoDatastore.getInstance();

    if (req.method === "GET") {
        res.status(200).json(await instance.chats.all())
    }
    else if (req.method === "POST") {
        // todo this transforming logic can be extracted
        const users = (req.body as NewChatBody).users.map(user => {
            return {...user, _id: new ObjectId(user._id)}
        }) as User[];

        res.status(201).json(await instance.chats.createChat(users));
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}