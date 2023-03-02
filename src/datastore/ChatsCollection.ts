import { Collection } from 'mongodb';
import Chat from '../models/Chat';

class ChatsCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Chat[]> {
    return (await this.col.find({}).toArray()) as Chat[];
  }
}

export default ChatsCollection;
