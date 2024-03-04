/**
 * customer.repo.js
 *
 * Pulls from and pushes data to the customer
 * database.
 */

import Customer from "../models/customer.model.js";

/**
 * Gets one or more customers from the database.
 */
export const getCustomerFromRepo = async (query) => {
	try {
		return await Customer.find(query);
	} catch (e) {
		throw e;
	}
}

/**
 * Updates an existing customer in the database.
 */
export const updateCustomerInRepo = async (query, update) => {
	try {
		return await Customer.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

/**
 * Deletes a customer from the database.
 */
export const deleteCustomerFromRepo = async (query) => {
	try {
		return await Customer.findOneAndDelete({...query});
	} catch (e) {
		throw e;
	}
}

/**
 * Creates a new customer inside the database.
 */
export const createCustomerInRepo = async (payload) => {
	try {
		const newCustomer = new Customer(payload);
		return await newCustomer.save();
	} catch (e) {
		throw e;
	}
}