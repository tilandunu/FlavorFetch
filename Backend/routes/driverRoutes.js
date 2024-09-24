const express = require("express");
const router = express.Router();
const DriverModel = require("../models/Driver");

// GET all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error });
  }
});

// GET driver by ID
router.get("/:id", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching driver", error });
  }
});

// POST create new driver
router.post("/", async (req, res) => {
  const newDriver = new DriverModel(req.body);
  try {
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ message: "Error creating driver", error });
  }
});

// PUT update driver by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await DriverModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedDriver) {
      res.status(200).json(updatedDriver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating driver", error });
  }
});

// DELETE driver by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDriver = await DriverModel.findByIdAndDelete(req.params.id);
    if (deletedDriver) {
      res.status(200).json({ message: "Driver deleted successfully" });
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting driver", error });
  }
});

// Default export
module.exports = router;
