import { Collection, FindOptions, ObjectId } from 'mongodb';
import ErrorTypes from '../ErrorTypes';
import Friend from '../models/Friend';
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

  async getUser(userId: ObjectId, options: FindOptions<Document> = {}): Promise<User> {
    const user = await this.col.findOne({ _id: userId }, options);
    console.log(user);
    if (user) {
      return user as User;
    }

    // user not found
    throw {
      type: ErrorTypes.USER_NOT_FOUND,
      message: userId.toString()
    };
  }

  async getFriends(userId: ObjectId): Promise<Friend[]> {
    const user = await this.getUser(userId);
    const friends: Friend[] = [];
    for (const { _id } of user.friends) {
      friends.push(await this.getUser(_id, {
        projection: {
          username: 1,
          tag: 1,
          status: 1
        }
      }) as Friend);
    }

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
