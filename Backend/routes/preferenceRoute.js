const express = require("express");
const router = express.Router();
const PreferenceModel = require("../models/Preference");

router.post("/create", async (req, res) => {
  const { customerUID, dietTypes, allergyInfo, variety } = req.body;

  // Input validation
  if (!customerUID) {
    return res.status(400).json({ error: "Customer ID is required" });
  }

  try {
    // Create a new preference document
    const preference = new PreferenceModel({
      customerUID,
      dietTypes,
      allergyInfo,
      variety,
    });

    // Save the preference to the database
    await preference.save();

    res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences: ", error.message);
    res.status(500).json({ error: "Server error while saving preferences" });
  }
});

router.get("/check/:customerUID", async (req, res) => {
  const { customerUID } = req.params;

  try {
    // Check if preferences exist for the given customerUID
    const preference = await PreferenceModel.findOne({ customerUID });

    if (preference) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking preferences: ", error.message);
    res.status(500).json({ error: "Server error while checking preferences" });
  }
});

router.get("/get/:customerUID", async (req, res) => {
  const { customerUID } = req.params;

  try {
    // Find the preferences by customerUID
    const preference = await PreferenceModel.findOne({ customerUID });

    if (preference) {
      return res.status(200).json(preference);
    } else {
      return res.status(404).json({ error: "Preferences not found" });
    }
  } catch (error) {
    console.error("Error fetching preferences: ", error.message);
    res.status(500).json({ error: "Server error while fetching preferences" });
  }
});

router.delete("/delete/:customerUID", async (req, res) => {
  const { customerUID } = req.params;

  try {
    // Delete the preference by customerUID
    const deletedPreference = await PreferenceModel.findOneAndDelete({
      customerUID,
    });

    if (deletedPreference) {
      return res
        .status(200)
        .json({ message: "Preferences deleted successfully" });
    } else {
      return res.status(404).json({ error: "Preferences not found" });
    }
  } catch (error) {
    console.error("Error deleting preferences: ", error.message);
    res.status(500).json({ error: "Server error while deleting preferences" });
  }
});

router.post("/update", async (req, res) => {
  const { customerUID, dietTypes, allergyInfo, variety } = req.body;

  if (!customerUID) {
    return res.status(400).json({ error: "Customer ID is required" });
  }

  try {
    // Find the existing preference by customerUID and update it
    const updatedPreference = await PreferenceModel.findOneAndUpdate(
      { customerUID },
      { dietTypes, allergyInfo, variety },
      { new: true } // Return the updated document
    );

    if (updatedPreference) {
      return res.status(200).json({
        message: "Preferences updated successfully",
        updatedPreference,
      });
    } else {
      return res.status(404).json({ error: "Preferences not found" });
    }
  } catch (error) {
    console.error("Error updating preferences: ", error.message);
    res.status(500).json({ error: "Server error while updating preferences" });
  }
});

module.exports = router;
