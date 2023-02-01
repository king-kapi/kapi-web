import { Collection, Db, MongoClient } from "mongodb";
import User, { newUser } from "../models/User";
import Collections from "./Collections";

class MongoDatastore {
    private static instance: MongoDatastore;
    private client: MongoClient;
    private datastore: Db;
    private usersCol: Collection;
    private chatsCol: Collection;
    private messagesCol: Collection;

    constructor(client: MongoClient) {
        this.client = client;
        this.datastore = this.client.db(process.env.MONGO_DB_NAME || "designthriving");
        this.usersCol = this.datastore.collection(Collections.USERS);
        this.chatsCol = this.datastore.collection(Collections.CHATS);
        this.messagesCol = this.datastore.collection(Collections.MESSAGES);
    }

    static async getInstance() {
        if (!MongoDatastore.instance) {
            // initialize new client
            let client = new MongoClient(process.env.MONGODB_CONNECTION_URI || "mongodb://localhost:27017/");
            try {
                await client.connect();

                MongoDatastore.instance = new MongoDatastore(client);
            } finally {
                console.error("Something went wrong with MongoDB!");
                await client.close();
            }
        }
        return MongoDatastore.instance;
    }

    async getUsers(): Promise<User[]> {
        return await this.usersCol.find({}).toArray() as User[];
    }

    async registerUsers(email: string, username: string): Promise<User> {
        // check valid input
        if (email.length == 0 || username.length == 0)
            throw Error("Email or username invalid!");

        // check if user already exists
        if (await this.usersCol.findOne({ email })) {
            throw Error("User already registered!");
        }
        let insertedId = (await this.usersCol.insertOne(newUser(email, username))).insertedId;

        return await this.usersCol.findOne({ "_id": insertedId }) as User;
    }
};

export default MongoDatastore;