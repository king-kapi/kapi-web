import { Request, Response, Router } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { Prisma, PrismaClient } from "@prisma/client";
import UserFindUniqueArgs = Prisma.UserFindUniqueArgs;

export default function usersHandler(
  prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    await protectApiRoute(req, res);

    try {
      const users = await prisma.user.findMany();
      res.status(200).send(users);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  });

  // TODO: Does Not Exist
  router.get("/current", async (req: Request, res: Response) => {
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

  // this modifies a user without any checking
  if (process.env.NODE_ENV === "development") {
    router.post("/", async (req: Request, res: Response) => {
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

  return router;
}