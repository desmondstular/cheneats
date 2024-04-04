/**
 * customer.route.js
 *
 * Routes for CRUD operations on customer data in database.
 */

import express from "express";
import {
	createCustomer,
	deleteCustomer,
	getCustomer, getCustomerByEmail,
	getCustomers,
	updateCustomer
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/byemail", getCustomerByEmail);	// get customer by email

router.get("/", getCustomers);				// get all customers
router.get("/:id", getCustomer);			// get by id
router.post("/", createCustomer);			// create new customer
router.patch("/:id", updateCustomer);		// update customer by id
router.delete("/:id", deleteCustomer);		// delete customer by id

export default router;
