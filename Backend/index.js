const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//const UserModel = require("./models/SupplierOrder");
const SupplierOrderModel=require("./models/SupplierOrder");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://tilandunu:1234@cluster0.kacglu2.mongodb.net/FlavorFetch?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB", err));

app.get('/', (req, res) => {
  SupplierOrderModel.find({})
    .then(supplierorders => {
      console.log("Fetched all users:", supplierorders);
      res.json(supplierorders);
    })
    .catch(err => {
      console.log("Error fetching users:", err);
      res.json(err);
    });
});

app.post("/createSupplierOrder", (req, res) => {
  console.log("Creating user with data:", req.body);
  SupplierOrderModel.create(req.body)
    .then(supplierorders => {
      console.log("User created:", supplierorders);
      res.json(supplierorders);
    })
    .catch(err => {
      console.log("Error creating user:", err);
      res.json(err);
    });
});

app.get('/getSupplierOrder/:id', (req, res) => {
  const id = req.params.id;
  console.log("Fetching user with ID:", id);
  SupplierOrderModel.findById(id)
    .then(supplierorders => {
      console.log("Fetched user:", SupplierOrder);
      res.json(SupplierOrder);
    })
    .catch(err => {
      console.log("Error fetching user:", err);
      res.status(400).json(err);
    });
});

app.put('/UpdateUser/:id', (req, res) => {
  const id = req.params.id;
  console.log("Updating user with ID:", id, "with data:", req.body);
  UserModel.findByIdAndUpdate(id, { Supplyiteam: req.body.Supplyiteam, Quantitiy: req.body.Quantitiy }, { new: true })
    .then(user => {
      console.log("Updated user:", user);
      res.json(user);
    })
    .catch(err => {
      console.log("Error updating user:", err);
      res.status(400).json(err);
    });
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  console.log("Deleting user with ID:", id);
  UserModel.findByIdAndDelete(id)
    .then(user => {
      console.log("Deleted user:", user);
      res.json(user);
    })
    .catch(err => {
      console.log("Error deleting user:", err);
      res.status(400).json(err);
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
