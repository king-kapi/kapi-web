import { GamesList } from "@/src/models/Game";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await protectApiRoute(req, res);

    // const instance = await MongoDatastore.getInstance();

    if (req.method === "GET") {
        res.status(200).json(GamesList);
    } else {
        res.status(405).send("405 Method Not Allowed.");
    }
}