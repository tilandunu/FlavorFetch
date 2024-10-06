const express = require("express");
const router = express.Router();
const RatingModel = require("../models/Rating");
const CustomerModel = require("../models/Customer");

// POST route to add a new rating
router.post("/add", async (req, res) => {
  const { recipeID, customerUID, rating, comment } = req.body;

  // Validate the required fields
  if (!recipeID || !customerUID || !rating) {
    return res
      .status(400)
      .json({ error: "Recipe ID, Customer UID, and Rating are required." });
  }

  try {
    // Create a new rating
    const newRating = new RatingModel({
      recipeID,
      customerUID,
      rating,
      comment,
    });

    // Save the rating to the database
    await newRating.save();

    return res.status(201).json({ message: "Rating added successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add rating. Please try again." });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  // Validate the required fields
  if (!rating) {
    return res.status(400).json({
      error: "Rating is required for update.",
    });
  }

  try {
    // Find the rating by its ID and update it
    const updatedRating = await RatingModel.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true } // Return the updated document
    );

    // Check if the rating was found and updated
    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found." });
    }

    return res
      .status(200)
      .json({ message: "Rating updated successfully!", updatedRating });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update rating. Please try again." });
  }
});

router.get("/getRatings/:recipeID", async (req, res) => {
  const { recipeID } = req.params;

  try {
    // Step 1: Find all ratings that match the recipeID
    const ratings = await RatingModel.find({ recipeID });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this recipe." });
    }

    // Step 2: Fetch customer details for each rating's customerUID
    const populatedRatings = await Promise.all(
      ratings.map(async (rating) => {
        const customer = await CustomerModel.findOne(
          { customerUID: rating.customerUID },
          "firstName lastName"
        );
        return {
          ...rating._doc, // Spread the original rating data
          customer: customer
            ? { firstName: customer.firstName, lastName: customer.lastName }
            : null, // Attach customer details if found
        };
      })
    );

    // Return the ratings along with customer details
    return res.status(200).json(populatedRatings);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch ratings." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the rating by ID and delete it
    const deletedRating = await RatingModel.findByIdAndDelete(id);

    // Check if the rating was found and deleted
    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found." });
    }

    return res.status(200).json({ message: "Rating deleted successfully!" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    return res.status(500).json({ message: "Failed to delete rating." });
  }
});

module.exports = router;
