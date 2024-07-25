const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  IngredientID: String,
  IngredientName: String,
  PricePerUnit: Number,
  StockQuantity: Number,
  IngredientImage: String,
});

const IngredientModel = mongoose.model("Ingredients", IngredientSchema);

module.exports = IngredientModel;
