const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const OrderModel = require("../models/Order");
const CustomerModel = require("../models/Customer");
const IngredientModel = require("../models/Ingredient");

// GET route to fetch all orders
router.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch order details by ID
router.get("/getOrder/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("ingredients.ingredient", "name pricePerUnit")
      .populate("customerUID", "name email");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
});

// POST route to create a new order
router.post("/createOrder", async (req, res) => {
  const {
    customerUID,
    ingredients,
    totalAmount,
    paymentMethod,
    deliveryAddress,
  } = req.body;

  try {
    const newOrder = new OrderModel({
      customerUID,
      ingredients,
      totalAmount,
      paymentMethod,
      deliveryAddress,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order. Please try again." });
  }
});

// PUT route to update an order status
router.put("/updateOrderStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Error updating order status" });
  }
});

// GET route to fetch orders by customer UID
router.get("/customerOrders", async (req, res) => {
  const customerUID = req.query.customerUID;

  if (!customerUID) {
    return res.status(400).json({ error: "Customer UID is required" });
  }

  try {
    const orders = await OrderModel.find({ customerUID })
      .populate("ingredients.ingredient", "name")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ error: "No orders found for this customer" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch orders by status
router.get("/ordersByStatus", async (req, res) => {
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const orders = await OrderModel.find({ status })
      .populate("customerUID", "name email")
      .populate("ingredients.ingredient", "name")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ error: `No orders found with status: ${status}` });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
