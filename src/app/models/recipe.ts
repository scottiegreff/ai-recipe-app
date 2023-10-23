import mongoose, { Schema } from "mongoose";

const recipeSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Kinds || mongoose.model("Kinds", recipeSchema);
