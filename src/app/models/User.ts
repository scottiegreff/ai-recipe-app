import mongoose, { Schema } from "mongoose";

// Define the schema for the individual recipes
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  recipe: {
    type: String,
    // required: true // if every recipe must have a recipe text
  }
});

// Define the user schema
const userSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Boolean },
  recipes: [recipeSchema] // Use the recipe schema for each item in the recipes array
});


// Export the model
const User = mongoose.model("User", userSchema);
export default User;
