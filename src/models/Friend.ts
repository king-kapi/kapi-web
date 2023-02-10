import { ObjectId } from "mongodb";
import UserStatus from "../enums/UserStatus";

type Friend = {
    _id: ObjectId
    username?: string,
    tag?: string,
    status?: UserStatus
};

export default Friend;
