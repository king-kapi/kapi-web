import { Collection, ObjectId } from 'mongodb';
import Message from '../models/Message';

class MessagesCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Message[]> {
    return (await this.col.find({}).toArray()) as Message[];
  }

  // TODO: implement count
  async getMessages(chatId: ObjectId, count = 20): Promise<Message[]> {
    return await this.col.find({
      chatId: chatId.toString()
    }).toArray() as Message[];
  }

  async getMessage(messageId: ObjectId): Promise<Message> {
    return await this.col.findOne({ _id: messageId }) as Message;
  }

  async pushMessage(message: Message): Promise<ObjectId> {
    const { insertedId } = await this.col.insertOne(message);

    return insertedId;
  }

  async deleteMessage(messageId: Message): Promise<void> {
    await this.col.deleteOne({
      _id: messageId
    });
  }
}

export default MessagesCollection;
