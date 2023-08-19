import mongoose, { model, models, Schema } from "mongoose";
import { CHAT_MODEL_NAME, USER_MODEL_NAME } from "@/src/models/ModelNames";
import { IUser } from "@/src/models/User";

interface IChatBase {
  _id: mongoose.Types.ObjectId;
  name?: string;
  users?: mongoose.Types.ObjectId[] | IUser[];
  color?: string;
}

export interface IChat extends IChatBase {
  users: mongoose.Types.ObjectId[];
}

export interface IChatPopulated extends IChatBase {
  users: IUser[];
}

const chatSchema = new Schema<IChat>({
  name: { type: String },
  users: { type: [mongoose.SchemaTypes.ObjectId], ref: USER_MODEL_NAME, default: [] },
  color: { type: String }
});

const Chat = models.Chat || model<IChat>(CHAT_MODEL_NAME, chatSchema);

export default Chat;