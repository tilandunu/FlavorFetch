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

router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Fetches all tickets
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  const { customerUID } = req.params;

  try {
    const ticket = await Ticket.findOneAndDelete({ customerUID });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update ticket by customerUID
router.put("/", async (req, res) => {
  const { customerUID, issueType, issue, responseMessage, status } = req.body;

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { customerUID }, // Adjust the query to find the correct ticket
      { issueType, issue, responseMessage, status },
      { new: true } // Return the updated ticket
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket", error });
  }
});
module.exports = router;
