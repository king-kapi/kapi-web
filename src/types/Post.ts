import { ObjectId } from "mongodb";

type Post = {
  _id: ObjectId;
  authorId: ObjectId;
  authorUsername: string;
  authorTag: string;
  tiemstamp: number;
  content: string;
  likes: number;
  comments: string[] // TODO: to be implemented
}

export default Post;
