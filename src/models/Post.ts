import { ObjectId } from "mongodb";

class Post {
    // todo implement comments
    constructor(public authorId: ObjectId,
        public authorUsername: string,
        public authorTag: string,
        public timestamp: number,
        public content: string,
        public likes: number,
        public _id?: ObjectId) { }
}

export default Post;
