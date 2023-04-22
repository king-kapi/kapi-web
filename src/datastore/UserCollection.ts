import { Collection, FindOptions, ObjectId } from 'mongodb';
import UserStatus from '../enums/UserStatus';
import { UserNotFoundError } from '../errors/UserErrors';
import { PartyRequestWithParty } from '../types/PartyRequest';
import User, { toUser } from '../types/User';
import UserProfile, { BLANK_USER_PROFILE } from '../types/UserProfile';
import GenerateRandomTag from '../utils/GenerateRandomTag';

class UserCollection {
  constructor(private col: Collection) { }

  async all(): Promise<User[]> {
    return (await this.col.find({}).toArray()) as User[];
  }

  async register({ id, email, image }: { id: ObjectId, email: string, image: string }): Promise<UserProfile> {
    // // check if user already exists
    // if (!(await this.getUserProfile(id)).newUser ) {
    //   throw new UserAlreadyRegistered(id);
    // }

    const newUser: UserProfile = {
      ...BLANK_USER_PROFILE,
      _id: id,
      email,
      image,
      tag: GenerateRandomTag(),
    }
    await this.col.updateOne({ _id: id }, { $set: newUser });

    return newUser;
  }

  async getUserProfile(userId: ObjectId, options: FindOptions<Document> = {}): Promise<UserProfile> {
    const user = await this.col.findOne({ _id: userId }, options) as UserProfile;
    if (user) {
      return user;
    }

    // user not found
    throw new UserNotFoundError(userId);
  }

  async getUserProfileByEmail(email: string, options: FindOptions<Document> = {}): Promise<UserProfile> {
    const user = await this.col.findOne({ email }, options) as UserProfile;
    if (user) {
      return user;
    }

    // user not found
    throw new UserNotFoundError(email);
  }

  async getUser(userId: ObjectId, options: FindOptions<Document> = {}): Promise<User> {
    return toUser(await this.getUserProfile(userId, options));
  }

  async getUserByEmail(email: string, options: FindOptions<Document> = {}): Promise<User> {
    return toUser(await this.getUserProfileByEmail(email, options));
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
  async addPartyRequest(userId: ObjectId, request: PartyRequestWithParty): Promise<void> {
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
