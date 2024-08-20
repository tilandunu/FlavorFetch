const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  driverUID: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

const DriverModel = mongoose.model("Driver", DriverSchema);

module.exports = DriverModel;
