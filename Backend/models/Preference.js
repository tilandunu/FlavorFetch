const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  customerUID: {
    type: String,
    ref: "Customer",
    required: true,
  },
  dietTypes: { type: String, enum: ["Vegan", "Paleo"], default: null },
  allergyInfo: {
    type: [String],
    enum: ["Dairy-Free", "Nut-Free", "Soy-Free", "Sugar-Free"],
    default: [],
  },
  variety: {
    type: [String],
    enum: [
      "SriLankan",
      "Chinese",
      "Western",
      "Italian",
      "Mexican",
      "Indian",
      "American",
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const PreferenceModel = mongoose.model("Preference", PreferenceSchema);

module.exports = PreferenceModel;
