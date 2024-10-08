const express = require("express");
const router = express.Router();
const RatingModel = require("../models/Rating");

// POST route to create a new rating
router.post("/save", async (req, res) => {
    const { recipe, customerUID, rating, comment, image } = req.body;
    const newRating = new RatingModel({ 
        recipe,
        customerUID,
        rating,
        comment,
        image
    });
    try {
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to get all ratings
router.get("/get/all", async (req, res) => {
    try {
        const ratings = await RatingModel.find();
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to get a rating by ID
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const rating = await RatingModel.findById(id);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to get ratings by customer UID
router.get("/get/customer/:customerUID", async (req, res) => {
    const customerUID = req.params.customerUID;
    try {
        const ratings = await RatingModel.find({ customerUID });
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to get ratings by recipe ID
router.get("/get/recipe/:recipe", async (req, res) => {
    const recipe = req.params.recipe;
    try {
        const ratings = await RatingModel.find({ recipe });
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE route to delete a rating
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const rating = await RatingModel.findByIdAndDelete(id);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.json({ message: "Rating deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT route to update a rating
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { rating, comment, image } = req.body;
    try {
        const updatedRating = await RatingModel.findByIdAndUpdate(
            id,
            { rating, comment, image },  
            { new: true }
        );
        if (!updatedRating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        res.json(updatedRating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
