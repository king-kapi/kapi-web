import protectApiRoute from "@/src/utils/protectApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await protectApiRoute(req, res);

  if (req.method === "GET") {
    const prisma = new PrismaClient();

    res.status(200).json(await prisma.user.findUnique({
      where: {
        id: id
      },
      include: req.query.include ? JSON.parse(atob(req.query.include as string))  : {}
    }));
  } else {
    res.status(405).send("405 Method Not Allowed.");
  }
}
