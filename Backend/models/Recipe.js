const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  chefUID: {
    type: String,
    ref: "Chef",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Main Courses",
      "Desserts",
      "Beverages",
      "Breakfast",
      "Salads",
      "Soups & Stews",
    ],
    required: true,
  },
  variety: {
    type: String,
    enum: [
      "SriLankan",
      "Chinese",
      "Western",
      "Italian",
      "Mexican",
      "Indian",
      "American",
    ],
    required: true,
  },
  dietTypes: [{ type: String, enum: ["Vegan", "Paleo"] }],
  allergyInfo: [
    {
      type: String,
      enum: ["Dairy-Free", "Nut-Free", "Soy-Free", "Sugar-Free"],
    },
  ],

  preparationTime: { type: String, default: "N/A" },
  cookingTime: { type: String, default: "N/A" }, // e.g., '30 minutes'
  servingCount: { type: Number, required: true },
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  additionalIngredients: [{ type: String }],
  instructions: { type: String },
  createdAt: { type: Date, default: Date.now },
  recipeImage: { type: String },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
