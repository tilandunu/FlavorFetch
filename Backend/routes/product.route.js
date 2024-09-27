import  express  from "express";

import { createproduct,  deletesup, getproduct,  updatesup } from "../controllers/product.controller.js";


const router = express.Router();

router.post('/Pcreate',createproduct );
router.get('/getAll', getproduct);


router.put("/update/:daId",  updatesup);
router.delete("/deletes/:sId",  deletesup);


export default router;
