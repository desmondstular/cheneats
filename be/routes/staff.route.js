/**
 * staff.route.js
 *
 * Contains the routes for the staff collection.
 */

import express from "express";
import {
	getStaffs,
	getStaff,
	updateStaff,
	deleteStaff,
	createStaff, getStaffByEmail
} from "../controllers/staff.controller.js";

const router = express.Router();

router.get("/byemail", getStaffByEmail);	// Get staff by email address
router.get("/", getStaffs);			          // Get all items
router.get("/:id", getStaff);			        // Get item by id
router.patch("/:id", updateStaff);		    // Update item by id
router.delete("/:id", deleteStaff);		    // Delete item by id
router.post("/", createStaff);			      // Create new items

export default router;
