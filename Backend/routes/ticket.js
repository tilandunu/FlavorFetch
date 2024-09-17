const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket"); // Assuming you have a Ticket model

// POST route to create a new ticket
router.post("/", async (req, res) => {
  try {
    const { customerUID, issueType, issue, responseMessage, status } = req.body;

    const newTicket = new Ticket({
      customerUID,
      issueType,
      issue,
      responseMessage,
      status,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all tickets (you might want to add authentication and authorization here)
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// You can add more routes here for updating, deleting, or fetching specific tickets

module.exports = router;
