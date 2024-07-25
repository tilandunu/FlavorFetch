const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  TicketID: String,
  UserID: String,
  Type: String,
  Subject: String,
  Description: String,
  Status: String,
  Reply: String,
  CreatedDate: String,
});

const TicketModel = mongoose.model("Tickets", TicketSchema);

module.exports = TicketModel;
