const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  RecipeID: String,
  UserID: String,
  Title: String,
  Description: String,
  PrepTime: String,
  CookingTime: String,
  Servings: Number,
  Instructions: String,
  Restrictions: String,
  Variety: String,
  Allegies: String,
  RecipeImage: String,
});

const RecipeModel = mongoose.model("Recipes", RecipeSchema);

module.exports = RecipeModel;
