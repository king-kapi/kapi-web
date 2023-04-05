import { ObjectId } from 'mongodb';
import User from './User';

type Message = {
  _id?: ObjectId;
  chatId: ObjectId;
  sender: User;
  content: string;
  timestamp: number;
  metadata: { unknown: unknown };
};

export default Message;
