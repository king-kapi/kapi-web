import { Collection, ObjectId } from 'mongodb';
import Chat from '../models/Chat';
import Message from '../models/Message';

class ChatsCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Chat[]> {
    return await this.col.find({}).toArray() as Chat[];
  }

  async getMessages(chatId: ObjectId, count = 20): Promise<Message[]> {
    return await this.col.find({
      chatId
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

export default ChatsCollection;
