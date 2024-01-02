import { ObjectId } from 'mongodb';

type Message = {
  _id: ObjectId;
  chatId: ObjectId;
  senderId: string;
  message: string;
  timestamp: number;
  metadata: object;
};
export default Message;
