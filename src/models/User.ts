import { ObjectId } from "mongodb";
import InterestTag from "./InterestTag";

type User = {
	_id: ObjectId;
	email: string; // or whatever connects to Google Auth
	username: string;
	tag: string; // don't know if we want this, but talk with designers!
	bio: string;
	interests: InterestTag[];
	avatar: string; // or base64 don't know!
	friends: User[]; // might need an additional model to also hold relevant chats!
}

export default User;