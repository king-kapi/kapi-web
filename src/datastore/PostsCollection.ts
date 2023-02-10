import { Collection } from 'mongodb';

class UserCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Post[]> {
    return (await this.col.find({}).toArray()) as Post[];
  }
}

export default UserCollection;
