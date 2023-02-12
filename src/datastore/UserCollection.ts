import { Collection, ObjectId } from 'mongodb';
import ErrorTypes from '../ErrorTypes';
import DatastoreErrorTypes from '../ErrorTypes';
import User, { newUser } from '../models/User';

class UserCollection {
  constructor(private col: Collection) { }

  async all(): Promise<User[]> {
    return (await this.col.find({}).toArray()) as User[];
  }

  async register(email: string, username: string): Promise<User> {
    // check valid input
    // TODO: Validate email string either inside the component or do it here
    // Use an external library. Do NOT try to write custom regex here
    if (email.length === 0 || username.length === 0) {
      throw Error('Email or username invalid!');
    }

    // check if user already exists
    if (await this.col.findOne({ email })) {
      throw Error('User already registered!'); // TODO: is this caught?
    }
    const insertedId = (await this.col.insertOne(newUser(email, username))).insertedId;

    // TODO: Validate schema instead of casting, or wrap this inside a getter
    return (await this.col.findOne({ _id: insertedId })) as User;
  }

  async getUser(userId: ObjectId) : Promise<User> {
    const user = await this.col.findOne({ _id: userId });
    if (user) {
      return user as User;
    }

    // user not found
    throw {
      type: ErrorTypes.USER_NOT_FOUND,
      message: userId.toString()
    };
  }

  async addFriend(userId: ObjectId, newFriendId: ObjectId): Promise<void> {
    // verify user exists
    await this.getUser(userId);
    const newFriend = await this.getUser(newFriendId);
    
    await this.col.updateOne({
      _id: userId,
    }, {
      $push: {
        friends: {
          id: newFriendId,
          username: newFriend.username
        }
      }
    });
  }
}

export default UserCollection;
