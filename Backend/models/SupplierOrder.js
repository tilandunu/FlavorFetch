const mongoose = require("mongoose");

const SupplierOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  orders: [
    {
      ingredientName: { type: String, required: true },
      quantity: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Pending", "Approved"],
        default: "Pending",
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const SupplierOrderModel = mongoose.model("SupplierOrder", SupplierSchema);

module.exports = SupplierModel;
