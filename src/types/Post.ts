import { ObjectId } from "mongodb";
import User from "./User";

type Post = {
  _id: ObjectId;
  author: User;
  tiemstamp: number;
  content: string;
  likes: number;
  comments: string[] // TODO: to be implemented
}

export default Post;
