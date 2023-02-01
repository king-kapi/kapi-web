import MongoDatastore from "@/src/datastore/MongoDatastore";
<<<<<<< HEAD
import User from "@/src/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ds = await MongoDatastore.getInstance();

    if (req.method === 'POST') { // register a user
        try {
            let createdUser: User = await ds.registerUsers(req.body.email, req.body.username);

            res.status(201).json(createdUser);
        } catch (exception) {
            res.status(500).json({
                "message": (exception as Error).message
            });
        }
    }
    else { // return list of users
        res.status(200).json(await ds.getUsers() || []);
    }
=======
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send((await MongoDatastore.getInstance()).getUsers());
>>>>>>> 2f14e2b (added basic user functionality and various models)
}