const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);

module.exports = SupplierModel;
