/**
 * customer.route.js
 *
 * Routes for CRUD operations on customer data in database.
 */

import express from "express";

const router = express.Router();

router.get("/");			// get all customers
router.get("/:id");		// get by id
router.post("/");			// create new customer
router.patch("/:id");		// update customer by id
router.delete("/:id");		// delete customer by id

export default router;
