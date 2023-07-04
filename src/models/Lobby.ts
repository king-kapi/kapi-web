import mongoose, { model, models, Schema } from "mongoose";
import { LOBBY_MODEL_NAME, LOBBY_REQUEST_MODEL_NAME, USER_MODEL_NAME } from "@/src/models/ModelNames";
import { ILobbyRequest, ILobbyRequestPopulated } from "@/src/models/LobbyRequest";
import { IUser } from "@/src/models/User";

interface ILobbyBase {
  _id: mongoose.Types.ObjectId;
  name: string;
  game: string;
  hostId: mongoose.Types.ObjectId;
  tags: string[];
  numPlayers: number;
  description: string;
  requests: mongoose.Types.ObjectId[] | ILobbyRequestPopulated[];
  users: mongoose.Types.ObjectId[] | IUser[];
}

export interface ILobby extends ILobbyBase {
  requests: mongoose.Types.ObjectId[];
  users: mongoose.Types.ObjectId[];
}

export interface ILobbyPopulated extends ILobbyBase {
  requests: ILobbyRequestPopulated[];
  users: IUser[];
}

const lobbySchema = new Schema<ILobby>({
  name: { type: String, required: true },
  game: { type: String, required: true },
  hostId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  tags: { type: [String], required: true },
  numPlayers: { type: Number, required: true },
  description: { type: String, required: true },
  requests: { type: [mongoose.SchemaTypes.ObjectId], ref: LOBBY_REQUEST_MODEL_NAME, default: [] },
  users: { type: [mongoose.SchemaTypes.ObjectId], ref: USER_MODEL_NAME, required: true }
});

const Lobby = models.Lobby || model<ILobby>(LOBBY_MODEL_NAME, lobbySchema);

export default Lobby;