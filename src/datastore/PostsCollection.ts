import { Collection, ObjectId } from 'mongodb';
import Post from '../models/Post';
import MongoDatastore from './MongoDatastore';

class PostsCollection {
  constructor(private col: Collection, private instance: MongoDatastore) { }

  async all(): Promise<Post[]> {
    // console.log(await this.col.find({}).toArray() as Post[]);
    return (await this.col.find({}).toArray()) as Post[];
  }

  async createPost(authorId: ObjectId, content: string): Promise<ObjectId> {
    const author = await this.instance.users.getUser(authorId);
    const post = new Post(authorId, author.username, author.tag, Date.now(), content, 0);

    const insertedPost = await this.col.insertOne(post);

    return insertedPost.insertedId;
  }
}

export default PostsCollection;
