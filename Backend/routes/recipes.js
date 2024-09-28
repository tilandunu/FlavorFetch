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

// Fetch all ingredients
router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await IngredientModel.find({}, "_id name"); // Fetch only the _id and name fields
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
});

// Create a recipe
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
    // Map the strings to ObjectId
    const ingredientObjectIds = selectedIngredients.map(
      (ingredient) => new mongoose.Types.ObjectId(ingredient)
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
      selectedIngredients: ingredientObjectIds, // Store ObjectIds in the schema
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

// Fetch recipes by chef UID
router.get("/chefRecipes", async (req, res) => {
  const chefUID = req.query.chefUID;

  if (!chefUID) {
    return res.status(400).json({ error: "Chef UID is required" });
  }

  try {
    const recipes = await RecipeModel.find({ chefUID });
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a recipe by ID
router.get("/getRecipe/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

// Fetch all recipes
router.get("/allRecipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recipe by ID with populated ingredients
router.get("/getRecipeParam/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId)
      .populate("selectedIngredients", "_id name")
      .lean();

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

// Populate ingredients based on IDs
router.get("/populateIngredients", async (req, res) => {
  const ingredientIds = req.query.ingredientIds; // Expecting an array of ingredient IDs

  if (!ingredientIds) {
    return res.status(400).json({ error: "Ingredient IDs are required" });
  }

  try {
    const ingredients = await IngredientModel.find({
      _id: { $in: ingredientIds },
    }).select("_id name pricePerUnit ingredientImage"); // Fetch only the _id and name fields

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Error fetching ingredients" });
  }
});

// Get selected ingredient by ID
router.get("/getSelectedIngredients/:id", async (req, res) => {
  try {
    const ingredient = await IngredientModel.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({ error: "Error fetching ingredient" });
  }
});

router.delete("/deleteRecipe/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully!" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

router.put("/updateRecipe/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, servingCount } = req.body;
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      id,
      { title, description, servingCount },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
