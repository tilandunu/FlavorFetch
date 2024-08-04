const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  uid: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  vehicleDetails: {
    type: String,
    licensePlate: String,
  },
});

const DriverModel = mongoose.model("Drivers", DriverSchema);

module.exports = DriverModel;
