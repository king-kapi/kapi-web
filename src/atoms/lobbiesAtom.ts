import {atomsWithQuery} from "jotai-tanstack-query";
import {LobbyPopulated} from "@/src/types/Lobby";

export const [lobbiesAtom, lobbiesStatusAtom] = atomsWithQuery(get => ({
  queryKey: ["lobbies"],
  queryFn: async () => {
    const res = await fetch("/api/lobbies");
    return await res.json() as LobbyPopulated[];
  }
}));