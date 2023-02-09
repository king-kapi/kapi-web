import { ObjectId } from 'mongodb';

type Message = {
  _id: ObjectId;
  chatId: ObjectId;
  sender: ObjectId;
  content: string;
  timestamp: number;
  metadata: { unknown: unknown };
};

export default Message;
