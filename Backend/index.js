import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

// Import routes
import pr from './routes/product.route.js';
import userRouter from './routes/users';
import ticketRouter from './routes/ticket';
import feedbackRouter from './routes/feedback';
import recipeRouter from './routes/recipes';
import orderRouter from './routes/orders';
import driverRouter from './routes/driverRoutes';

dotenv.config();

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/product', pr);         // Product route
app.use('/api/users', userRouter);   // User route
app.use('/api/tickets', ticketRouter);   // Ticket route
app.use('/api/feedback', feedbackRouter); // Feedback route
app.use('/api/recipes', recipeRouter);   // Recipe route
app.use('/api/orders', orderRouter);   // Order route
app.use('/api/drivers', driverRouter);   // Driver route

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
