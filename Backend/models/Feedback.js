const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  customerUID: {
    type: String,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);

module.exports = FeedbackModel;
