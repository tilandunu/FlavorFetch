const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const IngredientModel = require("./models/Ingredients");
const OrderModel = require("./models/Orders");
const PreferenceModel = require("./models/Preferences");
const RatingModel = require("./models/Ratings");
const RecipeIngredientModel = require("./models/RecipeIngredients");
const RecipeModel = require("./models/Recipes");
const SupplierModel = require("./models/Suppliers");
const TicketModel = require("./models/Tickets");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(3001, () => {
  console.log("Server is running");
});
