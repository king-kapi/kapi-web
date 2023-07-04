import mongoose, { model, models, Schema } from "mongoose";
import { GAME_MODEL_NAME } from "@/src/models/ModelNames";

export interface IGame {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  numPlayers: number[];
}

const gameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  image: { type: String, default: ""},
  numPlayers: {type: [Number], required: true}
});

const Game = models.Game || model<IGame>(GAME_MODEL_NAME, gameSchema);

export default Game;