import express from "express";
import bodyParser from "body-parser"; // Default import
const { json } = bodyParser; // Destructure to get `json`
import cors from "cors";
import { connect } from "mongoose";
import drivers from "./routes/driverRoutes.js"; // Path to driver routes
import deliveryOrderRoutes from "./routes/deliveryOrderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001; // Use the environment variable for PORT or fallback to 3001

// Use CORS
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
connect(
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

app.use("/api/drivers", drivers);
app.use("/api/deliveryOrders", deliveryOrderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
