import mongoose, { model, models, Schema } from "mongoose";
import UserStatus from "@/src/enums/UserStatus";
import { LOBBY_MODEL_NAME, USER_MODEL_NAME } from "@/src/models/ModelNames";
import Pronouns from "@/src/enums/Pronouns";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string; // unique
  username: string;
  tag: string;
  bio: string;
  status: UserStatus;
  friends: mongoose.Types.ObjectId[];
  games: mongoose.Types.ObjectId[];
  pronouns: Pronouns;
  birthday: IBirthday;
  language: string;
  timezone: string;
  avatarColor: string;

  // lobby fields
  lobby?: mongoose.Types.ObjectId;

  onboarded: boolean;
}

export interface IBirthday {
  day?: number;
  month?: number;
  year?: number;
}

const birthdaySchema = new Schema<IBirthday>({
  day: { type: Number },
  month: { type: Number },
  year: { type: Number }
});

const userSchema = new Schema<IUser>({
  username: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  tag: { type: String, default: "" },
  bio: { type: String, default: "I'm a bio!" },
  status: { type: Number, default: UserStatus.OFFLINE },
  onboarded: { type: Boolean, default: false },
  friends: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
  games: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
  avatarColor: { type: String },
  language: { type: String },
  pronouns: { type: String },
  birthday: birthdaySchema,
  lobby: { type: mongoose.SchemaTypes.ObjectId, ref: LOBBY_MODEL_NAME }
});

const User = models.User || model<IUser>(USER_MODEL_NAME, userSchema);

export default User;