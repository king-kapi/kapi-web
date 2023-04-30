import { Collection, ObjectId } from 'mongodb';
import Post from '../types/Post';
import MongoDatastore from './MongoDatastore';
import OmitId from '../types/OmitId';
import User from '../types/User';

class PostsCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  async all(): Promise<Post[]> {
    // console.log(await this.col.find({}).toArray() as Post[]);
    return (await this.col.find({}).toArray()) as Post[];
  }

  async createPost(authorId: ObjectId, content: string): Promise<Post> {
    const author = await this.instance.users.getUser(authorId);

    const post: OmitId<Post> = {
      author,
      tiemstamp: Date.now(),
      content,
      likes: 0,
      comments: []
    }

    const { insertedId } = await this.col.insertOne(post);

    return {
      ...post,
      _id: insertedId
    };
  }
}

export default PostsCollection;
