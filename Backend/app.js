import express from 'express';
import bodyParser from 'body-parser'; // Default import
const { json } = bodyParser; // Destructure to get `json`
import cors from 'cors';
import { connect } from 'mongoose';
import orders from './routes/orderRoutes.js'; // Path to order routes
import drivers from './routes/driverRoutes.js'; // Path to driver routes

const app = express();
const PORT = process.env.PORT || 3001; // Use the environment variable for PORT or fallback to 3001

// Use CORS
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
connect('mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0'
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Use Routes
app.use('/api/orders', orders);
app.use('/api/drivers', drivers);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
