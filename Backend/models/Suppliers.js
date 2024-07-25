const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  SupplyID: String,
  UserID: String,
  SupplyItem: String,
  Quantity: Number,
  SupplyStatus: String,
});

const SupplierModel = mongoose.model("Suppliers", SupplierSchema);

module.exports = SupplierModel;
