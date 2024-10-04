const mongoose = require("mongoose");

const FavoriteRecipeSchema = new mongoose.Schema({
  customerUID: {
    type: String,
  },
  recipeID: {
    type: String,
  },
});

const FavoriteRecipeModel = mongoose.model(
  "FavoriteRecipe",
  FavoriteRecipeSchema
);
module.exports = FavoriteRecipeModel;
