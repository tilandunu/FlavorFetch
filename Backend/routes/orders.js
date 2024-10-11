const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

router.post("/create", async (req, res) => {
  const {
    customerUID,
    ingredients, // This should include ingredient and ingredientName
    totalAmount,
    paymentMethod,
    status,
    deliveryAddress,
  } = req.body;

  // Check for required fields
  if (!customerUID || !ingredients || !totalAmount || !deliveryAddress) {
    return res.status(400).json({ message: "Missing required order data" });
  }

  // Validate the ingredients array
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ message: "Ingredients must be an array and not empty" });
  }

  try {
    const newOrder = new OrderModel({
      customerUID,
      ingredients: ingredients.map((item) => ({
        ingredient: item.ingredient, // The ingredient ID
        ingredientName: item.ingredientName, // The ingredient name
        quantity: item.quantity, // The quantity of the ingredient
      })),
      totalAmount,
      paymentMethod,
      status,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();

    // Return the orderID (_id) after successfully saving the order
    res.status(201).json({ orderID: savedOrder._id });
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
router.put("/updateAddress/:orderId", async (req, res) => {
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

router.put("/save/:orderID", async (req, res) => {
  const { orderID } = req.params;
  const { paymentMethod, deliveryAddress, status } = req.body;

  try {
    // Find the order by ID and update it with the new details
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderID,
      {
        paymentMethod,
        deliveryAddress,
        status,
      },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
});

router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    // Populate the ingredients field to include ingredient details
    const order = await OrderModel.findById(orderId).populate("ingredients");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;
