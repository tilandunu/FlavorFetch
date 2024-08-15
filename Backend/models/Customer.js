const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  preferences: {
    dietTypes: [{ type: String, enum: ["Vegan", "Paleo"] }],
    allergyInfo: [
      {
        type: String,
        enum: ["Dairy-Free", "Nut-Free", "Soy-Free", "Sugar-Free"],
      },
    ],
    variety: [
      {
        type: String,
        enum: [
          "SriLankan",
          "Chinese",
          "Western",
          "Italian",
          "Mexican",
          "Indian",
          "American",
        ],
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
