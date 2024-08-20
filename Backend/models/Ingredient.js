const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["Fruit", "Vegetable", "Dairy", "Meat", "Grain", "Spice", "Other"],
    required: true,
  },
  stockQuantity: { type: Number, required: true }, // Total quantity available
  pricePerUnit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  ingredientImage: { type: String },
});

const IngredientModel = mongoose.model("Ingredient", IngredientSchema);

module.exports = IngredientModel;
