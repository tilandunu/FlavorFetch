/*const mongoose=require ('mongoose')

const SupplierSchema=new mongoose.Schema({
    id:String,
    Supplyiteam:String,
    Quantitiy:String
})

const UserModel=mongoose.model("supplierorders",SupplierSchema)
module.exports=UserModel

const SupplierOrderModel=mongoose.model("")
*/

const mongoose = require("mongoose");

const SupplierOrderSchema = new mongoose.Schema({
   id:String,
   Supplyiteam:String,
   Quantitiy:String
})

const SupplierOrderModel = mongoose.model("supplierorders", SupplierOrderSchema);
module.exports = SupplierOrderModel;