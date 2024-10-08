import mongoose from 'mongoose';

const DeliveryOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,  // Unique identifier for the delivery order
  },
  customerId: {
    type: String,
    ref: "Customer",
    required: true,  // ID of the customer placing the order
  },
  driverId: {
    type: String,
  },
  deliveryAddress: {
    type: String,
    required: true,  // Address for delivery
  },
 createdAt: {
    type: Date,
    default: Date.now,  // Timestamp of when the order was created
  },
  updatedAt: {
    type: Date,         // Timestamp of the last update (nullable)
    default: null,
  },
});

const DeliveryOrderModel = mongoose.model("DeliveryOrder", DeliveryOrderSchema);

export default DeliveryOrderModel;
