
import Sup from "../models/supply.model.js";


//create suplier
export const createproduct = async (req, res, next) => {
  

    const {  id,name,qunty } = req.body;
  
    const newSuplier = new Sup({
      id,name,qunty
     
      
  
    });
    try {
      const savedsup = await newSuplier.save();
      res.status(201).json(savedsup);
    } catch (error) {
      next(error);
    }
  };


   
  
export const getproduct = async (req, res, next) => {
    try {
      const suplier = await Sup.find();
  
      if (suplier.length > 0) {
        res.json({ message: "suplier detail retrieved successfully", suplier});
      } 
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };

  //create select

  //delete select
export const deletesup = async (req, res, next) => {

    try {
      await Sup.findByIdAndDelete(req.params.sId);
      res.status(200).json("The details has been deleted");
    } catch (error) {
      next(error);
    }
  };
  
  //update suplier
  export const updatesup = async (req, res, next) => {
   
    try {
      const updatesuplier = await Sup.findByIdAndUpdate(
        req.params.daId,
        {
          $set: {
           
            name: req.body.name,
            id: req.body.id,
            qunty: req.body.qunty,
            
          },
        },
        { new: true }
      );
      res.status(200).json(updatesuplier);
    } catch (error) {
      next(error);
    }
  };


 
  
  