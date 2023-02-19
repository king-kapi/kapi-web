import { ObjectId } from "mongodb";
import UserStatus from "../enums/UserStatus";

interface FriendModel {
    _id?: string | ObjectId;
    username?: string;
    tag?: string;
    status?: UserStatus;
}

class Friend implements FriendModel {
    constructor(init?:Partial<Friend>) {
        Object.assign(this, init);
    }

    static fromJson(json: FriendModel) {
        return new Friend({
            ...json,
            _id: new ObjectId(json._id)
        });
    }
}

export default Friend;
