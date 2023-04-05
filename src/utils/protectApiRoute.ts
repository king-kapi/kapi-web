import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import NotAuthenticatedError from "../errors/NotAuthenticatedError";

// todo: maybe better name haha
export default async function protectApiRoute(req: NextApiRequest, res: NextApiResponse): Promise<Session> {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).send("401: Not Authenticated");
        throw new NotAuthenticatedError();
    }

    return session;
}