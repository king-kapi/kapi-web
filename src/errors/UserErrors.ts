import { ObjectId } from "mongodb";

export class UserNotFoundError extends Error {
  type = 'USER_NOT_FOUND';
  message: string;

  constructor(user: string | ObjectId) {
    super();

    this.message = `User (${user.toString()}) not found.`;
  }
}

export class UserAlreadyRegistered extends Error {
  type = 'USER_ALREADY_REGISTERED';
  message: string;
  
  constructor(user: string | ObjectId) {
    super();

    this.message = `User (${user.toString()}) already registered.`;
  }
}

export class UserInvalid extends Error {
  type = 'USER_INVALID';
  message: string;
  
  constructor() {
    super();

    this.message = `Invalid username or email.`;
  }
}

// class UserNotFoundError extends Error {
//   constructor(public user: string | ObjectId | undefined) {
//       super("User not found: " + user);
//   }
// }