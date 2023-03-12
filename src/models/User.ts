import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import Friend from './Friend';
import UserStatus from '../enums/UserStatus';

class User {
  constructor(
    public email: string,
    public username: string,
    public tag: string,
    public friends: Friend[] = [],
    public bio?: string,
    public interests?: InterestTag[],
    public avatar?: string,
    public status?: UserStatus,
    public _id?: ObjectId
  ) {}
}

export default User;
