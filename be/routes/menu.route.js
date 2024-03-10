/**
 * menu.route.js
 *
 * Contains the routes for the menu collection.
 */

import express from "express";

const router = express.Router();

router.get("/");			// Get all items
router.get("/:id");		// Get item by id
router.patch("/:id");		// Update item by id
router.delete("/:id");		// Delete item by id
router.post("/");			// Create new menu item

export default router;
