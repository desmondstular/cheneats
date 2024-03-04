/**
 * restaurant.route.js
 *
 * Routes for CRUD operations on restaurant data in database.
 */

import express from "express";

const router = express.Router();

router.get("/");			// get all restaurants
router.get("/:id");		// get restaurant by id
router.post("/");			// create new restaurant
router.patch("/:id");		// update restaurant by id
router.delete("/:id");		// delete restaurant by id

export default router;
