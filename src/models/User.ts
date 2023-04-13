import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import Friend from './Friend';
import UserStatus from '../enums/UserStatus';
import { PartyRequestWithParty } from './PartyRequest';

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
  partyRequests: PartyRequestWithParty[];
  friendRequests: [];
}

export interface UserWithId extends User {
  _id: ObjectId;
}

export default User;
