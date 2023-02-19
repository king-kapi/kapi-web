import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import Friend from './Friend';

interface UserJson {
    _id?: string | ObjectId;
    email: string;
    username: string;
    tag: string;
    bio: string;
    interests: InterestTag[];
    avatar: string;
    friends: Friend[];
}

class User implements UserJson {
  _id?: ObjectId;
  email = ""; // or whatever connects to Google Auth
  username = "";
  tag = ""; // don't know if we want this, but talk with designers!
  bio = "";
  interests: InterestTag[] = [];
  avatar = ""; // or base64 don't know!
  friends: Friend[] = [];

  constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }

  static fromJson(json: UserJson) {
    return new User({
      ...json,
      _id: new ObjectId(json._id),
      interests: json.interests.map(interest => InterestTag.fromJson(interest)),
      friends: json.friends.map(friend => Friend.fromJson(friend)),
    });
  }
}

export default User;
