import { atomsWithQuery } from "jotai-tanstack-query";
import { IUser } from "@/src/models/User";

export const [userAtom, userStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["currentUser"],
  queryFn: async () => {
    const res = await fetch("/api/users/current");
    return await res.json() as IUser;
  }
}));