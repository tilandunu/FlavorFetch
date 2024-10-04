const express = require("express");
const router = express.Router();
const IngredientModel = require("../models/Ingredient");

router.post("/createIngredient", async (req, res) => {
    try {
      const { name, category, quantity, minQuantity, pricePerUnit } = req.body;
  
      // Create new ingredient instance
      const newIngredient = new IngredientModel({
        name,
        category,
        quantity,
        minQuantity,
        pricePerUnit,
        lowStock: quantity < minQuantity, // Set lowStock based on quantity and minQuantity
        date: new Date(),
      });
  
      // Save to database
      await newIngredient.save();
      res.status(201).json({ message: "Ingredient added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add ingredient", error });
    }
  });
  
  router.get("/ingredients", async (req, res) => {
    try {
      const ingredients = await IngredientModel.find();
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ingredients", error });
    }
  });
  
  router.delete("/ingredientsdeleteIngredient/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIngredient = await IngredientModel.findByIdAndDelete(id);
  
      if (!deletedIngredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
  
      res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete ingredient", error });
    }
  });

  router.put("/updateIngredient/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, quantity, minQuantity, pricePerUnit, date } = req.body;
  
      // Check if ingredient exists
      const ingredient = await IngredientModel.findById(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
  
      // Update fields
      ingredient.name = name;
      ingredient.category = category;
      ingredient.quantity = quantity;
      ingredient.minQuantity = minQuantity;
      ingredient.pricePerUnit = pricePerUnit;
      ingredient.lowStock = quantity < minQuantity;
      ingredient.date = date || ingredient.date;
  
      // Save the updated ingredient
      await ingredient.save();
      res.status(200).json({ message: "Ingredient updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update ingredient", error });
    }
  });

  router.get("/getIngredient/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ingredient = await IngredientModel.findById(id);
      
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ingredient", error });
    }
  });


module.exports = router;
