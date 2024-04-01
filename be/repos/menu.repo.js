/**
 * menu.repo.js
 *
 * Pulls from and pushes data to the menu items collection
 */

import Menu from '../models/menu.model.js';

/**
 * Gets one or more menu items from the database.
 */
export const getMenuFromRepo = async (query) => {
	try {
		return await Menu.find(query);
	} catch (e) {
		throw e;
	}
}

/**
 * Gets menu items from the database for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Array>} - A promise that resolves to an array of menu items.
 */
export const getMenuByRestaurantFromRepo = async (restaurantId) => {
    try {
        return await Menu.find({ restaurant_ref: restaurantId }).exec();
    } catch (e) {
        throw e;
    }
};

/**
 * Updates an existing menu item in the database.
 */
export const updateMenuInRepo = async (query, update) => {
	try {
		return await Menu.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

/**
 * Deletes a menu item from the database.
 */
export const deleteMenuFromRepo = async (query) => {
	try {
		return await Menu.findOneAndDelete({...query});
	} catch (e) {
		throw e;
	}
}

/**
 * Creates a new menu item inside the database.
 */
export const createMenuInRepo = async (payload) => {
	try {
		const newMenu = new Menu(payload);
		return await newMenu.save();
	} catch (e) {
		throw e;
	}
}