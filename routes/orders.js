import  express from "express";
import {editOrder,deleteOrder,viewOrder,orderList,createOrder} from "../controllers/order.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
//update order
router.put("/editOrder/:id", verifyToken, editOrder);

//delete order
router.delete("/deleteOrder/:id", verifyToken, deleteOrder);

//get a order
router.get("/viewOrder/:id",verifyToken, viewOrder);

//get a orderList
router.get("/orderList",verifyToken, orderList);

//create a order
router.post("/createOrder", verifyToken, createOrder);



export default router;