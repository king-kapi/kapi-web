import { ObjectId } from "mongodb";

export class AlreadyInPartyError extends Error {
  type = 'ALREADY_IN_PARTY';
  message: string;

  constructor(partyId: ObjectId, userId: ObjectId) {
    super();

    this.message = `${partyId.toString()} already has user ${userId}.`;
  }
}

export class NotInPartyError extends Error {
  type = 'NOT_IN_PARTY';
  message: string;

  constructor(partyId: ObjectId, userId: ObjectId) {
    super();

    this.message = `${partyId.toString()} does not have user ${userId}.`;
  }
}

export class NotHostError extends Error {
  type = 'NOT_HOST';
  message: string;

  constructor(partyId: ObjectId, userId: ObjectId) {
    super();

    this.message = `${userId.toString()} is not the host of party ${partyId.toString()}.`
  }
}