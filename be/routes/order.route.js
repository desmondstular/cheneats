/**
 * order.route.js
 *
 * Routes for CRUD operations on order data in database.
 */

import express from "express";
import {
	createOrder,
	deleteOrder,
	getOrder, getOrderByCustomerFull, getOrderByRestaurantFull,
	getOrders,
	updateOrder
} from "../controllers/order.controller.js";

const router = express.Router();

// Route for joining orders, customers, restaurants
router.get("/byrestaurant/:restaurant_ref", getOrderByRestaurantFull);
router.get("/bycustomer/:customer_ref", getOrderByCustomerFull);

router.get("/", getOrders);			// get all orders
router.get("/:id", getOrder);			// get Order by id
router.post("/", createOrder);		// create new Order
router.patch("/:id", updateOrder);	// update Order by id
router.delete("/:id", deleteOrder);	// delete Order by id

export default router;