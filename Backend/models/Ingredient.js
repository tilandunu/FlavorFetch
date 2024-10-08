const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  minQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  lowStock: {
    type: Boolean,
    default: false,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});



const IngredientModel = mongoose.model("Ingredient", IngredientSchema);

module.exports = IngredientModel;
