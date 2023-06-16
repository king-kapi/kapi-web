import { ObjectId } from "mongodb";

export class AlreadyInPartyError extends Error {
  type = 'ALREADY_IN_PARTY';
  message: string;

  constructor(partyId: ObjectId, userId: ObjectId) {
    super();

    this.message = `${partyId.toString()} already has user ${userId}.`;
  }
}

export class NotInLobbyError extends Error {
  type = 'NOT_IN_LOBBY';
  message: string;

  constructor(partyId: string, userId: string) {
    super();

    this.message = `${partyId} does not have user ${userId}.`;
  }
}

export class NotHostError extends Error {
  type = 'NOT_HOST';
  message: string;

  constructor(lobbyId: string, userId: string) {
    super();

    this.message = `${userId.toString()} is not the host of party ${lobbyId.toString()}.`
  }
}

export class CannotKickHost extends Error {
  type = 'CANNOT_KICK_HOST';
  message: string;

  constructor(lobbyId: string, hostId: string) {
    super();
    this.message = `Cannot kick host ${hostId} of lobby ${lobbyId}.`;
  }
}