/**
 * order.route.js
 *
 * Routes for CRUD operations on order data in database.
 */

import express from "express";
import {
    createOrder,
    deleteOrder,
    getOrder,
    getOrders,
    updateOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);			// get all orders
router.get("/:id", getOrder);			// get Order by id
router.post("/", createOrder);		// create new Order
router.patch("/:id", updateOrder);	// update Order by id
router.delete("/:id", deleteOrder);	// delete Order by id

export default router;