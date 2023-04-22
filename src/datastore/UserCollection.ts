import { Collection, FindOptions, ObjectId } from 'mongodb';
import UserStatus from '../enums/UserStatus';
import { UserAlreadyRegistered, UserInvalid, UserNotFoundError } from '../errors/UserErrors';
import OmitId from '../types/OmitId';
import PartyRequest from '../types/PartyRequest';
import User, { toUser } from '../types/User';
import UserProfile, { BLANK_USER_PROFILE } from '../types/UserProfile';
import GenerateRandomTag from '../utils/GenerateRandomTag';

class UserCollection {
  constructor(private col: Collection) { }

  async all(): Promise<User[]> {
    return (await this.col.find({}).toArray()) as User[];
  }

  async register(email: string, username: string): Promise<UserProfile> {
    // check valid input
    // TODO: Validate email string either inside the component or do it here
    // Use an external library. Do NOT try to write custom regex here
    if (email.length === 0 || username.length === 0) {
      throw new UserInvalid();
    }

    // check if user already exists
    if (await this.col.findOne({ email })) {
      throw new UserAlreadyRegistered(email);
    }

    const newUser: OmitId<UserProfile> = {
      ...BLANK_USER_PROFILE,
      email: username,
      username: username,
      tag: GenerateRandomTag(),
    }
    const { insertedId } = (await this.col.insertOne(newUser));

    return {
      _id: insertedId,
      ...newUser
    };
  }

  async getUser(userId: ObjectId, options: FindOptions<Document> = {}): Promise<User> {
    return toUser(await this.getUserProfile(userId, options));
  }

  async getUserByEmail(email: string, options: FindOptions<Document> = {}): Promise<User> {
    const user = await this.col.findOne({ email }, options) as UserProfile;
    if (user) {
      return toUser(user);
    }

    // user not found
    throw new UserNotFoundError(email);
  }

  async getUserProfile(userId: ObjectId, options: FindOptions<Document> = {}): Promise<UserProfile> {
    const user = await this.col.findOne({ _id: userId }, options) as UserProfile;
    if (user) {
      return user;
    }

    // user not found
    throw new UserNotFoundError(userId);
  }

  async getFriends(userId: ObjectId): Promise<User[]> {
    const user = await this.getUserProfile(userId);
    console.log("user", user);
    const friends = await Promise.all(user.friends.map(async (friend) =>
      await this.getUser(friend._id, {
        projection: {
          username: 1,
          tag: 1,
          status: 1
        }
      })));

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

  // add a request
  async addPartyRequest(userId: ObjectId, request: PartyRequest): Promise<void> {
    await this.col.updateOne({
      _id: userId
    }, {
      $push: {
        partyRequests: request
      }
    });
  }

  // add a request
  async removePartyRequest(userId: ObjectId, partyId: ObjectId): Promise<void> {
    await this.col.updateOne({
      _id: userId
    }, {
      $pull: {
        "partyRequests": {
          "party._id": partyId
        }
      }
    });
  }
}

export default UserCollection;
