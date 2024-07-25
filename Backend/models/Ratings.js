const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  RatingID: String,
  UserID: String,
  RecipeID: String,
  RatingValue: Number,
  RatingDate: String,
});

const RatingModel = mongoose.model("Ratings", RatingSchema);

module.exports = RatingModel;
