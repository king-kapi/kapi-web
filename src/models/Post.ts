import { ObjectId } from "mongodb";

type Post = {
    _id: ObjectId,
    authorId: ObjectId,
    authorUsername: string,
    authorTag: string
    timestamp: number,
    content: string,
    likes: string,
    comments: void // TODO: to be implemented
}

export default Post;
