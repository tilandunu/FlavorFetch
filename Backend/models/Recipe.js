const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Appetizers & Snacks",
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
      "Asian",
      "Chinese",
      "Western",
      "Italian",
      "Mexican",
      "Indian",
      "Mediterranean",
      "American",
    ],
    required: true,
  },
  dietaryInfo: {
    dietTypes: [{ type: String, enum: ["Vegan", "Paleo"] }],
    allergyInfo: [
      {
        type: String,
        enum: ["Dairy-Free", "Nut-Free", "Soy-Free", "Sugar-Free"],
      },
    ],
  },
  preparationTime: { type: String, required: true }, // e.g., '30 minutes'
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
  createdAt: { type: Date, default: Date.now },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
