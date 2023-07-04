import { Collection } from 'mongodb';
import Chat from '../types/Chat';
import User from '../types/User';
import MongoDatastore from './MongoDatastore';
import OmitId from '../types/OmitId';

class ChatsCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  async all(): Promise<Chat[]> {
    return await this.col.find({}).toArray() as Chat[];
  }

  async createChat(users: User[]): Promise<Chat> {
    const chat: OmitId<Chat> = {
      name: '',
      users: [],
      icon: ''
    }

    // verify every user_old
    for (const user of users) {
      await this.instance.users.getUser(user._id);
      chat.users.push(user);
    }


    const {insertedId} = await this.col.insertOne(chat);

    return {
      ...chat,
      _id: insertedId
    };
  }
}

export default ChatsCollection;
