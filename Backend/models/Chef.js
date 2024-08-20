const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema({
  chefUID: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ChefModel = mongoose.model("Chef", ChefSchema);

module.exports = ChefModel;
