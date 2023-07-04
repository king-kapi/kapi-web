import mongoose, { model, models, Schema } from "mongoose";
import UserStatus from "@/src/enums/UserStatus";
import { USER_MODEL_NAME, LOBBY_MODEL_NAME } from "@/src/models/ModelNames";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus;
  onboarded: boolean;
  friends: mongoose.Types.ObjectId[];

  // lobby fields
  lobby?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  username: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  tag: { type: String, default: "" },
  bio: { type: String, default: "I'm a bio!" },
  status: { type: Number, default: UserStatus.OFFLINE },
  onboarded: { type: Boolean, default: false },
  friends: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
  lobby: { type: mongoose.SchemaTypes.ObjectId, ref: LOBBY_MODEL_NAME }
});

const User = models.User || model<IUser>(USER_MODEL_NAME, userSchema);

export default User;