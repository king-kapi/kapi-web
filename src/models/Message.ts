import { ObjectId } from 'mongodb';

type Message = {
  _id: ObjectId;
  chat_id: ObjectId; // TODO: use camel case
  sender: ObjectId;
  content: string;
  timestamp: number;
  metadata: { any: any };
};

export default Message;
