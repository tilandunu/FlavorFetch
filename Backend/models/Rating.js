const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  customerUID: {
    type: String,
    ref: "Customer",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating scale from 1 to 5
  comment: { type: String }, // Optional comment about the recipe
  createdAt: { type: Date, default: Date.now },
});

const RatingModel = mongoose.model("Rating", RatingSchema);

module.exports = RatingModel;
