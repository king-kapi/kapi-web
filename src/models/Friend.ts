import { ObjectId } from "mongodb";
import UserStatus from "../enums/UserStatus";

class Friend {

    constructor(public username: string, public tag: string, public _id: ObjectId, public status?: UserStatus) { }

    // static fromJson(json: FriendModel) {
    //     return new Friend(json.username, json.tag, json._id, json.tag);
    // }
}

export default Friend;
