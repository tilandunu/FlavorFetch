// models/DeliveryOrderModel.js

import mongoose from "mongoose";

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  customerId: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  note: { type: String }, 
  estimatedTime: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

const DeliveryOrderModel = mongoose.model("DeliveryOrder", deliveryOrderSchema);
export default DeliveryOrderModel;
