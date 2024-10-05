const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  recipeID: {
    type: String,
    required: true,
  },
  customerUID: {
    type: String,
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RatingModel = mongoose.model("Rating", RatingSchema);

module.exports = RatingModel;
