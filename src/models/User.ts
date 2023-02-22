import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import Friend from './Friend';
import UserStatus from '../enums/UserStatus';

class User {

  constructor(public email: string,
    public username: string,
    public tag: string,
    public bio?: string,
    public interests?: InterestTag[],
    public avatar?: string,
    public friends?: Friend[],
    public status?: UserStatus,
    public _id?: ObjectId) { }

  // static fromJson(json: UserModel) {
  //   return new User({
  //     ...json,
  //     _id: new ObjectId(json._id),
  //     interests: json.interests.map(interest => InterestTag.fromJson(interest)),
  //     friends: json.friends.map(friend => Friend.fromJson(friend)),
  //   });
  // }
}

export default User;
