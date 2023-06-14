import { Express, Request, Response } from "express";
import { Party, PrismaClient } from "@prisma/client";
import protectApiRoute from "@/src/utils/protectApiRoute";

export default async function partyHandler(
  app: Express,
  prisma: PrismaClient) {
  app.get("/api/party/all", async (req: Request, res: Response) => {
    try {
      res.status(200).send(await prisma.party.findMany());
    } catch (e) {
      res.status(400).send(e)
    }
  });

  app.post("/api/party", async (req: Request, res: Response) => {
    const session = await protectApiRoute(req, res);

    try {
      const created = await prisma.party.create({
        data: {
          ...req.body,
          hostId: session.id
        }
      });

      console.log(created);

      // create relation between party and user
      await prisma.user.update({
        where: {
          id: session.id
        },
        data: {
          partyId: created.id
        }
      });

      res.status(201).send(created);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });
}