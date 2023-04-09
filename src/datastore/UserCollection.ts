import { Collection, FindOptions, ObjectId } from 'mongodb';
import UserStatus from '../enums/UserStatus';
import UserNotFoundError from '../errors/UserNotFoundError';
import Friend from '../models/Friend';
import User, { UserWithoutId } from '../models/User';
import GenerateRandomTag from '../utils/GenerateRandomTag';

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
    const insertedId = (await this.col.insertOne(new UserWithoutId(username, email, GenerateRandomTag()))).insertedId;

    // TODO: Validate schema instead of casting, or wrap this inside a getter
    return (await this.col.findOne({ _id: insertedId })) as User;
  }

  async getUser(userId: ObjectId | undefined, options: FindOptions<Document> = {}): Promise<User> {

    const user = await this.col.findOne({ _id: userId }, options) as User;
    if (user) {
      return user;
    }

    // user not found
    throw new UserNotFoundError(userId);
  }

  async getUserByEmail(email: string, options: FindOptions<Document> = {}): Promise<User> {

    const user = await this.col.findOne({ email }, options) as User;
    if (user) {
      return user;
    }

    // user not found
    throw new UserNotFoundError(email);
  }

  async getFriends(userId: ObjectId | undefined): Promise<Friend[]> {
    const user = await this.getUser(userId);
    console.log("user", user);
    const friends = await Promise.all(user.friends.map(async (friend) =>
      await this.getUser(friend._id, {
        projection: {
          username: 1,
          tag: 1,
          status: 1
        }
      }) as Friend));

    return friends;
  }

  async addFriend(userId: ObjectId, friendId: ObjectId): Promise<void> {
    // verify user exists
    await this.getUser(userId);
    const newFriend = await this.getUser(friendId);

    await this.col.updateOne({
      _id: userId,
    }, {
      $push: {
        friends: {
          _id: friendId,
          username: newFriend.username
        }
      }
    });
  }

  async setStatus(userId: ObjectId, status: UserStatus): Promise<void> {
    // verify user exists
    await this.getUser(userId);

    // update user
    await this.col.updateOne({
      _id: userId,
    }, {
      $set: { status }
    });
  }

  async removeFriend(userId: ObjectId, friendId: ObjectId): Promise<void> {
    // verify user exists
    await this.getUser(userId);
    // verify friend exists
    await this.getUser(friendId);

    await this.col.updateOne({
      _id: userId,
    }, {
      $pull: {
        friends: {
          _id: friendId,
        }
      }
    });
  }
}

export default UserCollection;
