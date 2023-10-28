import mongoose, { Schema } from "mongoose";

const countryFlagSchema: Schema = new Schema({
  _id: { type: String },
  citizen: { type: String },
  flagName: { type: String },
  flagImage: { type: String },
});

export default mongoose.models.CountryFlag ||
  mongoose.model("CountryFlag", countryFlagSchema);
