import { ObjectId } from "mongodb";

export class AlreadyInLobbyError extends Error {
  name = "ALREADY_IN_LOBBY";

  constructor(lobbyId: ObjectId, userId: ObjectId) {
    super(`${lobbyId.toString()} already has user ${userId}.`);
  }
}

export class NotInLobbyError extends Error {
  name = "NOT_IN_LOBBY";

  constructor(partyId: string, userId: string) {
    super(`${partyId} does not have user ${userId}.`);
  }
}

export class NotHostError extends Error {
  name = "NOT_HOST";

  constructor(lobbyId: string, userId: string) {
    super(`${userId.toString()} is not the host of party ${lobbyId.toString()}.`);
  }
}

export class CannotKickHost extends Error {
  name = "CANNOT_KICK_HOST";

  constructor(lobbyId: string, hostId: string) {
    super(`Cannot kick host ${hostId} of lobby ${lobbyId}.`);
  }
}