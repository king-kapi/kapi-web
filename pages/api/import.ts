import MongoDatastore from "@/src/datastore/MongoDatastore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const datastore = await MongoDatastore.getInstance();

        res.json({
            users: await datastore.users.all(),
            chats: await datastore.chats.all(),
            posts: await datastore.posts.all(),
            messages: await datastore.messages.all()
        });
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}