const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    img: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
     
    },
  
   
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);


module.exports =  Product;