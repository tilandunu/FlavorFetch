const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/users");
const ticketRouter = require("./routes/ticket");
const feedbackRouter = require("./routes/feedback");
const recipeRouter = require("./routes/recipes");
const orderRouter = require("./routes/orders");
const driverRouters = require("./routes/driverRoutes");
const orderRouters = require("./routes/orderRoutes");
const supplyOrderRouters = require("./routes/supplyRoute");
const preferenceRouters = require("./routes/preferenceRoute");
const favoriteRouters = require("./routes/favoriteRecipes");
const ingredientRouters = require("./routes/ingredients");
const ratingRouters = require("./routes/ratingRoutes")
const ratingRouter = require("./routes/rating");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/order", orderRouter);
app.use("/api/orders", orderRouters);
app.use("/api/drivers", driverRouters);
app.use("/api/supplyOrder", supplyOrderRouters);
app.use("/api/preference", preferenceRouters);
app.use("/api/favorites", favoriteRouters);
app.use("/api/ingredients", ingredientRouters);
app.use("/api/ratings", ratingRouters);
app.use("/api/rating", ratingRouter);

app.listen(3001, () => {
  console.log("Server is running");
});
