const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

router.post("/create", async (req, res) => {
  const {
    customerUID,
    ingredients,
    totalAmount,
    paymentMethod,
    status,
    deliveryAddress,
  } = req.body;

  if (!customerUID || !ingredients || !totalAmount || !deliveryAddress) {
    return res.status(400).json({ message: "Missing required order data" });
  }

  try {
    const newOrder = new OrderModel({
      customerUID,
      ingredients,
      totalAmount,
      paymentMethod,
      status,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Route to fetch customer orders by customerUID and status
router.get("/customerOrders", async (req, res) => {
  const customerUID = req.query.customerUID;
  const status = req.query.status; // Get the status from query

  if (!customerUID) {
    return res.status(400).json({ message: "Customer UID is required" });
  }

  try {
    const query = { customerUID };
    if (status) {
      query.status = status; // Add status to query if provided
    }
    const orders = await OrderModel.find(query);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Route to update the delivery address for a specific order
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { deliveryAddress } = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { deliveryAddress },
      { new: true } // Return the updated document
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Failed to update order" });
  }
});

// Route to delete an order by ID
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
