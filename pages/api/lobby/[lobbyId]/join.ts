// import MongoDatastore from "@/src/datastore/MongoDatastore";
// import protectApiRoute from "@/src/utils/protectApiRoute";
// import { ObjectId } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";
// import { PartyParams } from "../[partyId]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { user } = await protectApiRoute(req, res);

//   const instance = await MongoDatastore.getInstance();

//   if (req.method === "POST") {
//     const partyId = new ObjectId((req.query as PartyParams).partyId);
//     const result = await instance.parties.join(partyId, user._id);

//     if (result.ok)
//       res.status(200).send("Joined party.");
//     else
//       res.status(400).send(result.error);
//   } else {
//     res.status(405).send("405 Method Not Allowed.");
//   }
// }

// disabled for now unless we are allowing open party functions