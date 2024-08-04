const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema({
  uid: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
});

const ChefModel = mongoose.model("Chefs", ChefSchema);

module.exports = ChefModel;
