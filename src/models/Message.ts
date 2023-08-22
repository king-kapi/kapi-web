import mongoose, { model, models, Schema } from "mongoose";
import { IUser } from "@/src/models/User";
import { MESSAGE_MODEL_NAME, USER_MODEL_NAME } from "@/src/models/ModelNames";

export interface IMessage {
  _id: mongoose.Types.ObjectId | string;
  chatId: mongoose.Types.ObjectId | string;
  sender: IUser | mongoose.Types.ObjectId | string;
  content: string;
  timestamp: number;
  metadata: object;
}

export interface IMessagePopulated extends IMessage {
  sender: IUser;
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: mongoose.SchemaTypes.ObjectId },
  sender: { type: mongoose.SchemaTypes.ObjectId, ref: USER_MODEL_NAME },
  content: { type: String },
  timestamp: { type: Number },
  metadata: { type: Object }
});

const Message = models.Message || model<IMessage>(MESSAGE_MODEL_NAME, MessageSchema);

export default Message;