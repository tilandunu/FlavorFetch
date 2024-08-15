const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  issue: { type: String, required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  responseMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

module.exports = TicketModel;
