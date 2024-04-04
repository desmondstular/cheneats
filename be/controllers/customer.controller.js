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
		next(e);
	}
}

/**
 * Returns a specific customer from the database by their id.
 */
export const getCustomer = async (req, res, next) => {
	const {id} = req.params;
	try {
		const customer = await getCustomerFromRepo({_id: id});
		res.status(200).send(customer);
	} catch (e) {
		next(e);
	}
}

/**
 * Updates a customer in the database by their id.
 */
export const updateCustomer = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const customer = await updateCustomerInRepo({_id: id}, body);
		res.status(200).send(customer);
	} catch (e) {
		next(e);
	}
}

/**
 * Deletes a customer in the database by their id.
 */
export const deleteCustomer = async (req, res, next) => {
	const {id} = req.params;
	try {
		const customerDeleted = await deleteCustomerFromRepo({_id: id});
		if (customerDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	} catch (e) {
		next(e);
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
		next(e);
	}
}

/**
 * Gets a customer by email.
 */
export const getCustomerByEmail = async(req, res, next) => {
	const {email} = req.query;
	try {
		const customer = await getCustomerFromRepo({email: email});
		res.status(200).send(customer);
	} catch (e) {
		next(e);
	}
}