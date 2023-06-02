import { Express, Request, Response } from "express";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const userHandler = (app: Express) => {
  app.get("/api/user", async (req: Request, res: Response) => {
    const session = await getServerSession(req, res, authOptions);
    console.log(process.env.PORT);
    return res.status(200).send("lmao");
  });
};

export default userHandler;