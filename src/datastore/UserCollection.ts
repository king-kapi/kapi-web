import { Collection } from "mongodb";
import User, { newUser } from "../models/User";

class UserCollection {
    private col : Collection;

    constructor(col: Collection) {
        this.col = col;
    }

    async all(): Promise<User[]> {
        return await this.col.find({}).toArray() as User[];
    }

    async register(email: string, username: string): Promise<User> {
        // check valid input
        if (email.length == 0 || username.length == 0)
            throw Error("Email or username invalid!");

        // check if user already exists
        if (await this.col.findOne({ email })) {
            throw Error("User already registered!");
        }
        let insertedId = (await this.col.insertOne(newUser(email, username))).insertedId;

        return await this.col.findOne({ "_id": insertedId }) as User;
    }
};

export default UserCollection;