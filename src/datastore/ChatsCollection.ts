import { Collection, ObjectId } from 'mongodb';
import Chat, { ChatBuilder } from '../models/Chat';
import Message from '../models/Message';
import User from '../models/User';
import MongoDatastore from './MongoDatastore';

class ChatsCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  async all(): Promise<Chat[]> {
    return await this.col.find({}).toArray() as Chat[];
  }

  async createChat(users: User[]): Promise<Chat> {
    const builder = new ChatBuilder();

    // verify every user
    for (const user of users) {
      
      await this.instance.users.getUser(user._id);
      builder.addUser(user);
    }

    const chat = builder.build();

    const {insertedId} = await this.col.insertOne(chat);
    chat._id = insertedId;

    return builder.build();
  }
}

export default ChatsCollection;
