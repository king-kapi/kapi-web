import UserStatus from '../enums/UserStatus';
import UserProfile from './UserProfile';

interface User {
  _id: string;
  email: string;
  username: string;
  tag: string;
  bio: string;
  status: UserStatus;
  friends?: string[];
  games?: string[];
  pronouns?: string[];
  birthday?: {
    day: number,
    month: number,
    year: number
  };
  language?: string;
  timezone?: string;
  avatarColor?: string;
  lobby?: string;
  onboarded: boolean;
}

export function toUser(profile: UserProfile): User {
  return {
    email: "", onboarded: false,
    _id: "stub",
    username: profile.username,
    tag: profile.tag,
    avatarColor: "stub",
    bio: profile.bio,
    status: profile.status
  }
}


export default User;
