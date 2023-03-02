import { ObjectId } from "mongodb";

class UserNotFoundError extends Error {
    constructor(public user: string | ObjectId | undefined) {
        super("User not found: " + user);
    }
}

export default UserNotFoundError;