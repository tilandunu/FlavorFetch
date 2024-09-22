const mongoose = require("mongoose");

const selectSchema = new mongoose.Schema(
  {

    currentuserId: {
      type: String,
      required: true,
      
    },
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
    product: {
        type: String,
        required: true,
       
      },
      
   
  },
  { timestamps: true }
);

const Select = mongoose.model('Select', selectSchema);

module.exports =  Select;