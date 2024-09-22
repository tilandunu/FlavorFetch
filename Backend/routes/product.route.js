const express = require("express");
const { createproduct, createselect,  currentuser, deletedata, getproduct, updatesdata } = require("../controllers/product.controller.js");


const router = express.Router();

router.post('/Pcreate',createproduct );
router.get('/getAll', getproduct);
router.post('/Ocreate',createselect );
router.get('/getlist/:currentuserId', currentuser);
router.put("/details/:dataId",  updatesdata);
router.delete("/delete/:suId",  deletedata);


module.exports = router;