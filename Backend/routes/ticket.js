const express = require("express");
const router = express.Router();
const CustomerModel = require("../models/Customer");
const TicketModel = require("../models/Ticket");

// Handle POST requests to create a new ticket
router.post("/", async (req, res) => {
  const { userID, issueType, issue, responseMessage } = req.body;

  // Check if all required fields are present
  if ( !issueType || !issue||!responseMessage) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the customer by userID
    const customer = await CustomerModel.findOne({ customerUID: userID });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Create and save a new ticket with the customer's ID
    const newTicket = new TicketModel({
      customerUID : userID, // Save the customer reference
      issueType,
      issue,
      responseMessage,
      status: "Open",
      createdAt: new Date(),
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket); // Return the saved ticket
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
