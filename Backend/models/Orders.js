const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  OrderID: String,
  UserID: String,
  OrderDate: String,
  TotalAmount: Number,
  OrderStatus: String,
});

const OrderModel = mongoose.model("Orders", OrderSchema);

module.exports = OrderModel;
