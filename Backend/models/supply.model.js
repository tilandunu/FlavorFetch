import mongoose from 'mongoose';

const supSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      
    },
   
    name: {
      type: String,
      required: true,
    },
    qunty: {
      type: String,
      required: true,
     
    },
  
   
  },
  { timestamps: true }
);

const Sup = mongoose.model('Sup', supSchema);

export default Sup;