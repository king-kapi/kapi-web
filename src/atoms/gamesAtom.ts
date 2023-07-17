import { atomsWithQuery } from "jotai-tanstack-query";
import { IGame } from "@/src/models/Games";

export const [gamesAtom, gamesStatusAtom] = atomsWithQuery(get => ({
  queryKey: ["games"],
  queryFn: async () => {
    const res = await fetch("/api/games");
    return await res.json() as IGame[];
  }
}));