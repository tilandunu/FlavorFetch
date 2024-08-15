const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);

module.exports = FeedbackModel;
