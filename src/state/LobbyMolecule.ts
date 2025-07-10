import { createScope, molecule } from "jotai-molecules";
import { atom } from "jotai";
import { atomsWithMutation, atomsWithQuery } from "jotai-tanstack-query";
import { ILobbyPopulated } from "@/src/models/Lobby";

export const LobbyScope = createScope<string | null>(null);

const LobbyMolecule = molecule((getMolecule, getScope) => {
  const lobbyId = getScope(LobbyScope);
  const lobbyIdAtom = atom(lobbyId);

  const [lobbyAtom, lobbyStatusAtom] = atomsWithQuery(get => ({
    queryKey: ["/lobbies", get(lobbyIdAtom)],
    queryFn: async () => {
      const res = await fetch(`/api/lobbies/${get(lobbyIdAtom)}`);
      if (!res.ok)
        throw await res.json();
      return await res.json() as ILobbyPopulated;
    },
    enabled: get(lobbyIdAtom) !== null
  }));

  const [lobbyKickAtom, lobbyKickStatusAtom] = atomsWithMutation(get => ({
    mutationKey: ["/lobbies/kick", get(lobbyIdAtom)],
    mutationFn: async (kickedId: string) => {
      const res = await fetch(`/api/lobbies/${get(lobbyIdAtom)}/kick`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          kickedId
        })
      });

      if (!res.ok)
        throw await res.json();
      return await res.json();
    }
  }));

  const [lobbyRequestAtom, lobbyRequestStatusAtom] = atomsWithMutation(get => ({
    mutationKey: ["/lobbies/request", get(lobbyIdAtom)],
    mutationFn: async (message: string) => {
      const res = await fetch(`/api/lobbies/${get(lobbyIdAtom)}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      });

      if (!res.ok)
        throw await res.json();
      return await res.json();
    }
  }));

  const [lobbyRequestAcceptAtom, lobbyRequestAcceptStatusAtom] = atomsWithMutation(get => ({
    mutationKey: ["/lobbies/request/accept", get(lobbyIdAtom)],
    mutationFn: async (requestId: string) => {
      const res = await fetch(`/api/lobbies/${get(lobbyIdAtom)}/request/${requestId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok)
        throw await res.text();
      return await res.text();
    }
  }));

  const [lobbyRequestDenyAtom, lobbyRequestDenyStatusAtom] = atomsWithMutation(get => ({
    mutationKey: ["/lobbies/request/accept", get(lobbyIdAtom)],
    mutationFn: async (requestId: string) => {
      const res = await fetch(`/api/lobbies/${get(lobbyIdAtom)}/request/${requestId}/deny`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok)
        throw await res.text();
      return await res.text();
    }
  }));

  return {
    lobbyIdAtom,

    lobbyAtom,
    lobbyStatusAtom,

    lobbyKickAtom,
    lobbyKickStatusAtom,

    lobbyRequestAtom,
    lobbyRequestStatusAtom,

    lobbyRequestAcceptAtom,
    lobbyRequestAcceptStatusAtom,

    lobbyRequestDenyAtom,
    lobbyRequestDenyStatusAtom
  };
});

export default LobbyMolecule;