 const mongoose = require("mongoose");

 const SupplierOrderSchema = new mongoose.Schema({
    id:String,
    Supplyiteam:String,
    Quantitiy:String
})

const SupplierOrderModel = mongoose.model("supplierorders", SupplierOrderSchema);
module.exports = SupplierOrderModel;
//   supplierID: {
//     type: String,
//     ref: "Supplier",
//     required: true,
//   },
//   ingredientName: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Rejected"],
//     default: "Pending",
//   },

//   createdAt: { type: Date, default: Date.now },
// });
/*const mongoose=require ('mongoose')

const SupplierSchema=new mongoose.Schema({
    id:String,
    Supplyiteam:String,
    Quantitiy:String
})

const UserModel=mongoose.model("supplierorders",SupplierSchema)
module.exports=UserModel*/