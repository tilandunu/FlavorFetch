const express = require("express");
const router = express.Router();
const ChefModel = require("../models/Chef");
const IngredientModel = require("../models/Ingredient");

// GET route to fetch chef details by UID
router.get("/chef", async (req, res) => {
  const chefUID = req.query.chefUID;

  if (!chefUID) {
    return res.status(400).json({ error: "Chef UID is required" });
  }

  try {
    const chef = await ChefModel.findOne({ chefUID });
    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    res.status(200).json(chef);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await IngredientModel.find({}, "_id name"); // Fetch only the _id and name fields
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
});

module.exports = router;
