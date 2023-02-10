import { Collection } from 'mongodb';
import Post from '../models/Post';

class PostsCollection {
  constructor(private col: Collection) { }

  async all(): Promise<Post[]> {
    return (await this.col.find({}).toArray()) as Post[];
  }
}

export default PostsCollection;
