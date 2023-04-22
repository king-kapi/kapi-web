import { ObjectId } from 'mongodb';
import UserStatus from '../enums/UserStatus';
import UserProfile from './UserProfile';

interface User {
  _id: ObjectId;
  username: string;
  avatar: string;
  tag: string;
  bio: string;
  status?: UserStatus;
}

export function toUser(profile: UserProfile): User {
  return {
    _id: profile._id,
    username: profile.username,
    tag: profile.tag,
    avatar: profile.avatar,
    bio: profile.bio,
    status: profile.status
  }
}


export default User;
