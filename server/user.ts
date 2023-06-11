import { Express, Request, Response } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { Prisma, PrismaClient } from "@prisma/client";
import UserFindUniqueArgs = Prisma.UserFindUniqueArgs;

export default async function userHandler(
  app: Express,
  prisma: PrismaClient) {
  app.get("/api/user", async (req: Request, res: Response) => {
    const { id } = await protectApiRoute(req, res);

    if (req.method === "GET") {
      const args: UserFindUniqueArgs = {
        where: {
          id: id
        }
      };

      if (req.query.include)
        args.include = JSON.parse(atob(req.query.include as string));

      const user = await prisma.user.findUnique(args);

      res.status(200).json(user);
    } else {
      res.status(405).send("405 Method Not Allowed.");
    }
  });

  if (process.env.NODE_ENV === "development") {
    app.post("/api/user", async (req: Request, res: Response) => {
      const { id } = await protectApiRoute(req, res);

      await prisma.user.update({
        where: {
          id
        },
        data: {
          [req.body.attribute]: req.body.value
        }
      });

      res.status(200).send("");
    });
  }
}