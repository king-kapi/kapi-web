export class UserNotFoundError extends Error {
  name = "USER_NOT_FOUND";

  constructor(user: string) {
    super(`User (${user.toString()}) not found.`);
  }
}

export class UserAlreadyRegistered extends Error {
  name = "USER_ALREADY_REGISTERED";

  constructor(user: string) {
    super(`User (${user.toString()}) already registered.`);
  }
}

export class UserInvalid extends Error {
  name = "USER_INVALID";

  constructor() {
    super(`Invalid username or email.`);
  }
}