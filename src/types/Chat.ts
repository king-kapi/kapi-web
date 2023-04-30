import { ObjectId } from 'mongodb';
import User from './User';

type Chat = {
  _id: ObjectId;
  name: string;
  users: User[];
  icon: string;
};

export default Chat;
