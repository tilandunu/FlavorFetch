const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const IngredientModel = require("./models/Ingredients");

const app = express();
app.use(cors());
app.use(express.json());

let x = mongoose.connect("mongodb://localhost:27017/my_reactapp");

if (x) {
  console.log("connected");
} else {
  console.log("not connected");
}

app.get("/", (req, res) => {
  IngredientModel.find({})
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.json(err));
});

app.get("/getIngredient/:id", (req, res) => {
  const id = req.params.id;
  IngredientModel.findById({ _id: id })
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.json(err));
});

app.post("/createIngredient", (req, res) => {
  IngredientModel.create(req.body)
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.json(err));
});

// app.put('/updateIngredient/:id', (req, res) => {
//     const id = req.params.id;
//     IngredientModel.findByIdAndUpdate({_id: id}, {
//         name: req.body.name,
//         catagory: req.body.catagory,
//         quantity: req.body.quantity,
//         minQuantity:req.body.minQuantity,
//         price: req.body.price,
//         date: req.body.date,
//         image: req.body.image})
//     .then(ingredients => res.json(ingredients))
//     .catch(err => res.json(err))
// })

app.put("/updateIngredient/:id", (req, res) => {
  const id = req.params.id;
  if (req.body.quantity > req.body.minQuantity) {
    req.body.lowStock = false;
  } else if (req.body.quantity == req.body.minQuantity) {
    req.body.lowStock = false;
  } else {
    req.body.lowStock;
  }

  IngredientModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      catagory: req.body.catagory,
      quantity: req.body.quantity,
      minQuantity: req.body.minQuantity,
      lowStock: req.body.lowStock,
      price: req.body.price,
      date: req.body.date,
      image: req.body.image,
    }
  )
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.json(err));
});

app.delete("/deleteIngredient/:id", (req, res) => {
  const id = req.params.id;
  IngredientModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/requestIngrediant", async (req, res) => {
  const ingReq = req.body;
  console.log("the requested items passed here are", ingReq);

  let reqDbResponse = await IngredientModel.findOne({ name: ingReq.ingName });

  if (reqDbResponse) {
    let min = reqDbResponse.minQuantity;
    //if we assume we gave out our stocks
    let asumption = reqDbResponse.quantity - ingReq.ingQty;
    if (min < asumption) {
      //we can give items
      console.log("lets issue items");
      reqDbResponse.quantity = asumption;
      await reqDbResponse.save();

      res.status(210).json("Your item has added");
    } else if (min > asumption && asumption > 0) {
      //low on stock
      console.log("indicate low on items");
      reqDbResponse.quantity = asumption;
      await reqDbResponse.save();
      reqDbResponse.lowStock = true;
      await reqDbResponse.save();

      console.log("value of lowStock is ", reqDbResponse.lowStock);
      res.status(210).json("Your item has added");
    } else if (asumption < 0) {
      // we have to think how to proceed here
      //res => <label htmlFor=''>Stock notification: We only have {reqDbResponse.StockQuantity} no of items</label>
      res.status(210).json("We currently low on stocks");
    }
  } else {
    res.status(402).json("item not found");
  }
});

app.get("/getLowStockItems", async (req, res) => {
  try {
    let reqStockResponse = await IngredientModel.find({ lowStock: true });
    if (reqStockResponse) {
      res.status(215).json(reqStockResponse);
    } else {
      res.status(315).json("no low stock items");
    }
  } catch (error) {
    res.status(415).json("Connection error");
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
