const mongoose = require("mongoose");

const SupplierOrderSchema = new mongoose.Schema({
  supplierID: {
    type: String,
    ref: "Supplier",
    required: true,
  },
  ingredientName: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

const SupplierOrderModel = mongoose.model("SupplierOrder", SupplierOrderSchema);

module.exports = SupplierOrderModel;
