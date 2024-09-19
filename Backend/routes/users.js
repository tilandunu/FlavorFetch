const express = require("express");
const router = express.Router();
const ChefModel = require("../models/Chef");
const CustomerModel = require("../models/Customer");
const DriverModel = require("../models/Driver");
const SupplierModel = require("../models/Supplier");


// POST route to create a new user
router.post("/", async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    uid,
    userType,
    phoneNumber,
    vehicleType,
    vehicleNumber,
    preferences,
  } = req.body;

  let newUser;

  try {
    switch (userType) {
      case "chef":
        newUser = new ChefModel({
          chefUID: uid,
          firstName,
          lastName,
          email,
          phoneNumber,
          createdAt: new Date(),
        });
        break;
      case "customer":
        newUser = new CustomerModel({
          customerUID: uid,
          firstName,
          lastName,
          email,
          phoneNumber,
          preferences,
          createdAt: new Date(),
        });
        break;
      case "driver":
        newUser = new DriverModel({
          firstName,
          lastName,
          email,
          phoneNumber,
          vehicleType,
          vehicleNumber,
          driverUID: uid,
          createdAt: new Date(),
        });
        break;
      case "supplier":
        newUser = new SupplierModel({
          firstName,
          lastName,
          email,
          phoneNumber,
          supplierUID: uid,
          createdAt: new Date(),
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid user type" });
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
