/**
 * restaurant.repo.js
 *
 * Pulls from and pushes data to the restaurant
 * database.
 */

import Restaurant from "../models/restaurant.model.js";

/**
 * Gets one or more restaurants from the database.
 */
export const getRestaurantFromRepo = async (query) => {
	try {
		return await Restaurant.find(query);
	} catch (e) {
		throw e;
	}
}

/**
 * Updates a restaurant in the database.
 */
export const updateRestaurantInRepo = async (query, update) => {
	try {
		return await Restaurant.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

/**
 * Deletes a restaurant from the database.
 */
export const deleteRestaurantFromRepo = async (query) => {
	try {
		return await Restaurant.findOneAndDelete(query);
	} catch (e) {
		throw e;
	}
}

/**
 * Creates a new restaurant in the database.
 */
export const createRestaurantInRepo = async (payload) => {
	try {
		const newRestaurant = new Restaurant(payload);
		return await newRestaurant.save();
	} catch (e) {
		throw e;
	}
}