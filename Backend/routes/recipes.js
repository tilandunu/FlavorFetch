const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ChefModel = require("../models/Chef");
const IngredientModel = require("../models/Ingredient");
const RecipeModel = require("../models/Recipe");

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

router.post("/createRecipe", async (req, res) => {
  const {
    chefUID,
    title,
    description,
    type,
    variety,
    dietTypes,
    selectedAllergies,
    prepTime,
    cookTime,
    servingCount,
    selectedIngredients,
    additionalIngredients,
    instructions,
    recipeImageUrl,
  } = req.body;

  try {
    const ingredientObjectIds = selectedIngredients.map(
      (ingredient) => new mongoose.Types.ObjectId(ingredient._id)
    );

    const newRecipe = new RecipeModel({
      chefUID,
      title,
      description,
      type,
      variety,
      dietTypes,
      selectedAllergies,
      prepTime,
      cookTime,
      servingCount,
      selectedIngredients: ingredientObjectIds,
      additionalIngredients,
      instructions,
      recipeImageUrl,
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res
      .status(500)
      .json({ message: "Failed to add recipe. Please try again." });
  }
});

module.exports = router;
