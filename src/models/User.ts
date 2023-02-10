import { ObjectId } from 'mongodb';
import InterestTag from './InterestTag';
import GenerateRandomTag from '../utils/GenerateRandomTag';
import Friend from './Friend';

type User = {
  _id?: ObjectId;
  email: string; // or whatever connects to Google Auth
  username: string;
  tag: string; // don't know if we want this, but talk with designers!
  bio: string;
  interests: InterestTag[];
  avatar: string; // or base64 don't know!
  friends: Friend[];
};

export function newUser(email: string, username: string): User {
  return {
    email,
    username: username,
    tag: GenerateRandomTag(),
    bio: 'placeholder',
    interests: [],
    avatar: 'placeholder',
    friends: [],
  };
}

export default User;
