const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customerUID: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
