const express = require("express");
const router = express.Router();
const TicketModel = require("../models/ticket");
const CustomerModel = require("../models/Customer");

// POST route to create a new ticket
router.post("/", async (req, res) => {
  const { userId, issueType, issue, responseMessage } = req.body;

  try {
    // Find the user based on the provided userId
    const user = await CustomerModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new ticket
    const newTicket = new TicketModel({
      user: user._id,
      issueType,
      issue,
      responseMessage,
      status: "Open", // Default status is "Open"
      createdAt: new Date(),
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
