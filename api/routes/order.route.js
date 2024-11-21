import express from "express";
import {verifyToken} from '../middelware/jwt.js'
const router =express.Router();
import {addGigToOrder,getOrderByUserId} from '../controller/order.controller.js'
// router.post('/:gigId',verifyToken,createOrder);
router.post('/addorder',verifyToken,addGigToOrder);
router.get('/getorder',verifyToken,getOrderByUserId);


export default router;