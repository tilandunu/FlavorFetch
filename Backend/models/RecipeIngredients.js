const mongoose = require("mongoose");

const RecipeIngredientSchema = new mongoose.Schema({
  RecipeID: String,
  IngredientID: String,
});

const RecipeIngredientModel = mongoose.model(
  "RecipeIngredients",
  RecipeIngredientSchema
);

module.exports = RecipeIngredientModel;
