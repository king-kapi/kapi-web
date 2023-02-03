import { ObjectId } from "mongodb";
import User from "./User";

type Chat = {
	_id: ObjectId;
	users: User[];
}

export default Chat;