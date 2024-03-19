/**
 * menu.route.js
 *
 * Contains the routes for the menu collection.
 */

import express from "express";
import {
	getMenus,
	getMenu,
	updateMenu,
	deleteMenu,
	createMenu,
	getMenuByRestaurant
} from "../controllers/menu.controller.js"

const router = express.Router();

router.get("/", getMenus);				// Get all items
router.get("/:id", getMenu);			// Get item by id
router.get("/restaurant/:restaurantId", getMenuByRestaurant);
router.patch("/:id", updateMenu);		// Update item by id
router.delete("/:id", deleteMenu);		// Delete item by id
router.post("/", createMenu);			// Create new menu item

export default router;
