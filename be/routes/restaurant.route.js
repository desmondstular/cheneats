/**
 * restaurant.route.js
 *
 * Routes for CRUD operations on restaurant data in database.
 */

import express from "express";
import {
	createRestaurant,
	deleteRestaurant,
	getRestaurant,
	getRestaurants,
	updateRestaurant
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);			// get all restaurants
router.get("/:id", getRestaurant);			// get restaurant by id
router.post("/", createRestaurant);		// create new restaurant
router.patch("/:id", updateRestaurant);	// update restaurant by id
router.delete("/:id", deleteRestaurant);	// delete restaurant by id

export default router;
