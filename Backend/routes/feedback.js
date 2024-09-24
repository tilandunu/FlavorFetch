const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback"); // Assuming you have a Feedback model

// POST route to create a new feedback
router.post("/", async (req, res) => {
  try {
    const { customerUID, message } = req.body;

    const newFeedback = new Feedback({
      customerUID,
      message,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetches all feedback
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete feedback by customerUID
router.delete("/", async (req, res) => {
  const { customerUID } = req.params;

  try {
    const feedback = await Feedback.findOneAndDelete({ customerUID });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// PUT route to update feedback by customerUID
router.put("/", async (req, res) => {
  const { customerUID } = req.params;
  const { message } = req.body;

  try {
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { customerUID }, // Adjust the query to find the correct feedback
      { message },
      { new: true } // Return the updated feedback
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error });
  }
});

module.exports = router;
