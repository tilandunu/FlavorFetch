const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/users");
const product = require("./routes/product.route");
const { default: Product } = require("./models/product.model");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0"
);

app.use("/api/users", userRouter);
app.use("/api/product", product);

app.listen(3001, () => {
  console.log("Server is running");
});
