const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  chefUID: {
    type: String,
  },
  title: { type: String },
  description: { type: String },
  type: {
    type: String,
  },
  variety: {
    type: String,
  },
  dietTypes: { type: String },
  selectedAllergies: [
    {
      type: String,
    },
  ],

  prepTime: { type: String, default: "N/A" },
  cookTime: { type: String, default: "N/A" }, // e.g., '30 minutes'
  servingCount: { type: Number },
  selectedIngredients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
  ],
  additionalIngredients: [{ type: String }],
  instructions: { type: String },
  createdAt: { type: Date, default: Date.now },
  recipeImageUrl: { type: String },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
