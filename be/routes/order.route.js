/**
 * order.route.js
 *
 * Routes for CRUD operations on order data in database.
 */

import express from "express";
import {
    addItemToOrder,
    createOrder,
    deleteOrder, getCartedOrderByCustomerIdRestaurantId,
    getOrder,
    getOrders,
    updateOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);			// get all orders
router.get("/:id", getOrder);			// get Order by id
router.post("/", createOrder); // create new Order
router.patch("/:id", updateOrder);
router.patch("/:id/:restaurant_id/:customer_id", addItemToOrder);
// update Order by id
router.delete("/:id", deleteOrder); // delete Order by id
router.get("/:restaurant_id/:customer_id", getCartedOrderByCustomerIdRestaurantId)

export default router;