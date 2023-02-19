import MongoDatastore from "@/src/datastore/MongoDatastore";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";

interface NewPostBody {
    authorId: string,
    content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const instance = await MongoDatastore.getInstance();

        return res.status(200).json(await instance.posts.all());
    } else if (req.method === "POST") {
        const instance = await MongoDatastore.getInstance();
        const {authorId, content} = req.body as NewPostBody;

        return res.status(201).json({
            postId: await instance.posts.createPost(new ObjectID(authorId), content)
        });
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}
