import { Collection } from 'mongodb';
import User, { newUser } from '../models/User';

class UserCollection {
  constructor(private col: Collection) {}

  async all(): Promise<User[]> {
    return (await this.col.find({}).toArray()) as User[];
  }

  async register(email: string, username: string): Promise<User> {
    // check valid input
    // TODO: Validate email string either inside the component or do it here
    // Do NOT try to use custom regex here, it will be incorrect
    if (email.length === 0 || username.length === 0) {
      throw Error('Email or username invalid!');
    }

    // check if user already exists
    if (await this.col.findOne({ email })) {
      throw Error('User already registered!');
    }
    const insertedId = (await this.col.insertOne(newUser(email, username))).insertedId;

    // TODO: Validate schema instead of casting, or wrap this inside a getter
    return (await this.col.findOne({ _id: insertedId })) as User;
  }
}

export default UserCollection;
