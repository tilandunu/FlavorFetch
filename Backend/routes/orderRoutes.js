const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find({ status: "To-Be-Delivered" });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// POST create new order
router.post("/", async (req, res) => {
  const newOrder = new OrderModel(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
});

// PUT update order by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error });
  }
});

// DELETE order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);
    console.log("Deleted order:", deletedOrder); // Log the deleted order
    if (deletedOrder) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order", error });
  }
});

// Route to get order count
router.get("/count", async (req, res) => {
  try {
    const count = await OrderModel.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router
module.exports = router;
