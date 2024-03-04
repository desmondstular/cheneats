/**
 * customer.controller.js
 *
 * Contains controller functions for customers.
 */
import {
	createCustomerInRepo,
	deleteCustomerFromRepo,
	getCustomerFromRepo,
	updateCustomerInRepo
} from "../repos/customer.repo.js";

/**
 * Returns a list of customers from the database.
 */
export const getCustomers = async (req, res, next) => {
	try {
		const customers = await getCustomerFromRepo();
		res.status(200).send(customers);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Returns a specific customer from the database by their id.
 */
export const getCustomer = async (req, res, next) => {
	const {id} = req.params;
	try {
		const customer = await getCustomerFromRepo({id: id});
		res.status(200).send(customer);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Updates a customer in the database by their id.
 */
export const updateCustomer = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const customer = await updateCustomerInRepo({id: id}, body);
		res.status(200).send(customer);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Deletes a customer in the database by their id.
 */
export const deleteCustomer = async (req, res, next) => {
	const {id} = req.params;
	try {
		const customerDeleted = await deleteCustomerFromRepo({id: id});
		if (customerDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Creates a new customer in the database.
 */
export const createCustomer = async(req, res, next) => {
	const {body} = req;
	try {
		const customer = await createCustomerInRepo(body);
		console.log("New Customer:\n", customer);
		res.status(200).send();
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}