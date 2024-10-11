const express = require("express");
const router = express.Router();
const SupplyOrderModel = require("../models/SupplierOrder");

router.post("/", async (req, res) => {
  const { supplierID, ingredientName, quantity } = req.body;

  if (!supplierID || !ingredientName || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newOrder = new SupplyOrderModel({
      supplierID,
      ingredientName,
      quantity,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create supply order" });
  }
});

router.get("/orders/:supplierID", async (req, res) => {
  try {
    const orders = await SupplyOrderModel.find({
      supplierID: req.params.supplierID,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

router.delete("/orders/:orderId", async (req, res) => {
  try {
    await SupplyOrderModel.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

router.put("/orders/:orderId", async (req, res) => {
  try {
    const updatedOrder = await SupplyOrderModel.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

router.get("/orderData/:orderId", async (req, res) => {
  try {
    const order = await SupplyOrderModel.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

router.get("/getPendingSupplies", async (req, res) => {
try{
  let pendingSupplies = await SupplyOrderModel.find({status : "Pending"})
  if(pendingSupplies){
    res.status(215).json(pendingSupplies)
  }else{
    res.status(315).json("No pending supplies")
  }

}catch(error){
  res.status(415).json("connection error")
  console.log(error)
}

});

module.exports = router;
