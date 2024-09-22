const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  customerUID: {
    type: String,
  },
  issueType: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  responseMessage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

module.exports = TicketModel;
