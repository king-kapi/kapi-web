import mongoose, { model, models, Schema } from "mongoose";
import { TAG_MODEL_NAME } from "@/src/models/ModelNames";

export interface ITag {
  _id: mongoose.Types.ObjectId;
  name: string;
  rainbow: boolean;
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  rainbow: { type: Boolean, default: false }
});

const Tag = models.Tag || model<ITag>(TAG_MODEL_NAME, tagSchema);

export default Tag;