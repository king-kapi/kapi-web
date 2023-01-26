import MongoDatastore from "@/src/datastore/MongoDatastore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send((await MongoDatastore.getInstance()).getUsers());
}