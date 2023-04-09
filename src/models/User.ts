import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import Friend from './Friend';
import UserStatus from '../enums/UserStatus';

// I'm not sure if this is a good idea, so I would like some opinions. If it's a problem, we should make this a separate issue
interface User {
  _id?: ObjectId;
  email: string;
  username: string;
  tag: string;
  friends: Friend[];
  bio?: string;
  interests?: InterestTag[];
  avatar?: string;
  status?: UserStatus;
}

export class UserWithoutId implements User {
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

export class UserWithId implements User {
  constructor(
    public _id: ObjectId,
    public email: string,
    public username: string,
    public tag: string,
    public friends: Friend[] = [],
    public bio?: string,
    public interests?: InterestTag[],
    public avatar?: string,
    public status?: UserStatus,
  ) {}
}

export default User;
