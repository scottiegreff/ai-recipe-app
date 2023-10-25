import mongoose, { Schema } from "mongoose";

const recipeSchema: Schema = new Schema({
  name: { type: String },
});

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
