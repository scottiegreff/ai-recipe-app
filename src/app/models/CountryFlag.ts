import mongoose, { Schema } from "mongoose";

const countryFlagSchema: Schema = new Schema({
  _id: { type: String },
  gptValue: { type: String },
  name: { type: String },
  image: { type: String },
  parent: { type: String },
});

export default mongoose.models.CountryFlag ||
  mongoose.model("CountryFlag", countryFlagSchema);
