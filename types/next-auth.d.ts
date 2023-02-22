import User from "@/src/models/User";
import "next-auth";
import { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: GoogleProfile & User;
    }
}