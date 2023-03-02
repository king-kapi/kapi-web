import { Collection } from 'mongodb';
import Message from '../models/Message';

class MessagesCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Message[]> {
    return (await this.col.find({}).toArray()) as Message[];
  }
}

export default MessagesCollection;
