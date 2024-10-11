const express = require("express");
const router = express.Router();
const FavoriteRecipeModel = require("../models/FavoriteRecipe");
const RecipeModel = require("../models/Recipe");

router.get("/checkFavorite/:customerUID/:recipeID", async (req, res) => {
  const { customerUID, recipeID } = req.params;

  try {
    const favorite = await FavoriteRecipeModel.findOne({
      customerUID,
      recipeID,
    });
    if (favorite) {
      return res.json({ isFavorite: true });
    }
    return res.json({ isFavorite: false });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ error: "Failed to check favorite" });
  }
});

router.post("/addFavorite", async (req, res) => {
  const { customerUID, recipeID } = req.body;

  try {
    const newFavorite = new FavoriteRecipeModel({ customerUID, recipeID });
    await newFavorite.save();
    res.status(201).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

router.delete("/removeFavorite/:customerUID/:recipeID", async (req, res) => {
  const { customerUID, recipeID } = req.params;

  try {
    await FavoriteRecipeModel.deleteOne({ customerUID, recipeID });
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

router.get("/favoriteRecipes/:customerUID", async (req, res) => {
  try {
    const { customerUID } = req.params;

    // Get favorite recipe IDs
    const favoriteRecipes = await FavoriteRecipeModel.find({ customerUID });
    const recipeIDs = favoriteRecipes.map((fav) => fav.recipeID);

    if (recipeIDs.length === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }

    // Fetch recipes using the recipeIDs
    const recipes = await RecipeModel.find({ _id: { $in: recipeIDs } });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching favorite recipes." });
  }
});

module.exports = router;
