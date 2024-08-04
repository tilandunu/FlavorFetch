const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  uid: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
});

const CustomerModel = mongoose.model("Customers", CustomerSchema);

module.exports = CustomerModel;
