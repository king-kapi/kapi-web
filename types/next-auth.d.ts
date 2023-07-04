import "next-auth";
import { IUser } from "@/src/models/User";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUser;
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: IUser;
    }
}