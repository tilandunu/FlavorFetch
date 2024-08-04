const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  PreferenceID: String,
  UserID: String,
  Allergies: [String],
  Restrictions: [String],
  Variety: [String],
});

const PreferenceModel = mongoose.model("Preferences", PreferenceSchema);

module.exports = PreferenceModel;
