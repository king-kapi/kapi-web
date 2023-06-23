import { NextFunction, Request, Response, Router } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import { PrismaClient } from "@prisma/client";

export default function usersHandler(
  prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const users = await prisma.user.findMany();
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  });

  // TODO: Does Not Exist error
  router.get("/current", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);

      const user = await prisma.user.findUnique({
        where: { id },
        include: { friends: true }
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

  // this modifies a user without any checking
  if (process.env.NODE_ENV === "development") {
    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
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
      } catch (err) {
        next(err);
      }
    });
  }

  return router;
}