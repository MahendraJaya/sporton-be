import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  imageUrl: string;
}

const CategorySchme: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ICategory>("Category", CategorySchme);
