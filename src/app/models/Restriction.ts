import mongoose, { Schema } from "mongoose";

const restrictionSchema: Schema = new Schema({
  _id: { type: String },
  restrictionType: { type: [String], required: true },
});

export default mongoose.models.Restriction ||
  mongoose.model("Restriction", restrictionSchema);