import { ObjectId } from "mongodb";

type Message = {
	_id: ObjectId;
	chat_id: ObjectId;
	sender: ObjectId;
	message: string;
	timestamp: number;
	metadata: {any: any};
}

export default Message;