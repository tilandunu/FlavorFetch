import express from "express";
import DeliveryOrderModel from "../models/DeliveryOrderModel.js";
import OrderModel from "../models/Order.js";

const router = express.Router();

// GET route to fetch all delivery orders
router.get("/deliveryOrders", async (req, res) => {
  try {
    const deliveryOrders = await DeliveryOrderModel.find();
    res.status(200).json({ deliveryOrders });
  } catch (error) {
    console.error("Error fetching delivery orders:", error);
    res.status(500).json({ error: "Failed to fetch delivery orders" });
  }
});

// POST route to create a delivery order
router.post("/deliveryOrders", async (req, res) => {
  const { orderId, customerId, deliveryAddress } = req.body;

  try {
    // Validate that the order exists in the Order model
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if the delivery order already exists to prevent duplication
    const existingDeliveryOrder = await DeliveryOrderModel.findOne({ orderId });
    if (existingDeliveryOrder) {
      return res.status(400).json({ error: "Delivery order already exists" });
    }

    // Create a new delivery order
    const newDeliveryOrder = new DeliveryOrderModel({
      orderId,
      customerId,
      deliveryAddress,
    });

    // Save the new delivery order
    await newDeliveryOrder.save();

    res.status(201).json({ message: "Delivery order created successfully", deliveryOrder: newDeliveryOrder });
  } catch (error) {
    console.error("Error creating delivery order:", error);
    res.status(500).json({ error: "Failed to create delivery order" });
  }
});

// DELETE route to delete a delivery order by orderId
router.delete("/deliveryOrders/:id", async (req, res) => {
    const { id } = req.params; // Use _id
  
    try {
      // Find the delivery order by _id
      const deliveryOrder = await DeliveryOrderModel.findById(id);
  
      if (!deliveryOrder) {
        return res.status(404).json({ error: "Delivery order not found" });
      }
  
      // Delete the delivery order
      await DeliveryOrderModel.deleteOne({ _id: id });
  
      res.status(200).json({ message: "Delivery order deleted successfully" });
    } catch (error) {
      console.error("Error deleting delivery order:", error);
      res.status(500).json({ error: "Failed to delete delivery order" });
    }
  });
  

export default router;
