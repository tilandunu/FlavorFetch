const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name: String,
    catagory: String,
    quantity: Number,
    minQuantity:Number,
    lowStock: Boolean,
    price: Number,
    date: Date,
    image: String
})

const IngredientModel = mongoose.model("ingredients",IngredientSchema)
module.exports = IngredientModel