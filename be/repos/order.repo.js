/**
 * order.repo.js
 *
 * Pulls from and pushes data to the order
 * database.
 */

import Order from "../models/order.model.js";

/**
 * Gets one or more orders from the database.
 */
export const getOrderFromRepo = async (query) => {
    try {
        return await Order.find(query);
    } catch (e) {
        throw e;
    }
}

/**
 * Updates a Order
 * in the database.
 */
export const updateOrderInRepo = async (query, update) => {
    try {
        return await Order.findOneAndUpdate(
            {...query},
            {...update},
            {new: true}
        ).lean()
    } catch (e) {
        throw e;
    }
}

/**
 * Deletes a order from the database.
 */
export const deleteOrderFromRepo = async (query) => {
    try {
        return await Order.findOneAndDelete(query);
    } catch (e) {
        throw e;
    }
}

/**
 * Creates a new restaurant in the database.
 */
export const createOrderInRepo = async (payload) => {
    try {
        const newOrder = new Order(payload);
        return await newOrder.save();
    } catch (e) {
        throw e;
    }
}

/**
 * Gets all orders for a specific restaurant and populates
 * all object references.
 */
export const getOrdersByRestaurantPopulated = async (query) => {
	try {
		const orders = await Order.find(query)
			.populate('customer_ref')
			.populate('staff_ref')
			.populate({
				path: 'items',
				populate: 'menu_ref'});
		return orders;
	} catch (e) {
		throw e;
	}
}