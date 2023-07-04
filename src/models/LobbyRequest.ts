import mongoose, { model, models, Schema } from "mongoose";
import { LOBBY_REQUEST_MODEL_NAME, USER_MODEL_NAME } from "@/src/models/ModelNames";
import { ILobby } from "@/src/models/Lobby";
import { IUser } from "@/src/models/User";

export interface ILobbyBase {
  _id: mongoose.Types.ObjectId;
  lobby: mongoose.Types.ObjectId | ILobby;
  sender: mongoose.Types.ObjectId | IUser;
  message: string;
}

export interface ILobbyRequest extends ILobbyBase {
  _id: mongoose.Types.ObjectId;
  lobby: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  message: string;
}

export interface ILobbyRequestPopulated extends ILobbyBase {
  _id: mongoose.Types.ObjectId;
  lobby: ILobby;
  sender: IUser;
  message: string;
}

const lobbyRequestSchema = new Schema<ILobbyRequest>({
  lobby: { type: mongoose.SchemaTypes.ObjectId, required: true },
  sender: { type: mongoose.SchemaTypes.ObjectId, ref: USER_MODEL_NAME, required: true },
  message: { type: String, required: true }
});

const LobbyRequest = models.LobbyRequest || model<ILobbyRequest>(LOBBY_REQUEST_MODEL_NAME, lobbyRequestSchema);

export default LobbyRequest;