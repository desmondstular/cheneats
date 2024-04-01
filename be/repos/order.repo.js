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

export const addItemToOrderRepo = async (query, newItem) => {
    try {
        // Find the order document by its ID
        const order = await Order.findOne(query);

        if (!order) {
            throw new Error('Order not found');
        }

        // Add the new item to the items array
        order.items.push(newItem);
        //let orderTotal = order.total;
        order.total = (order.total + newItem.subtotal)


        // Save the updated order document
        const updatedOrder = await order.save();

        return updatedOrder;
    } catch (error) {
        throw error;
    }
};




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
 * Creates a new order in the database.
 */
export const createOrderInRepo = async (restaurant_ref, customer_ref, status, total) => {
    try {
        const newOrder = new Order({ restaurant_ref, customer_ref, status, total });
        return await newOrder.save();
    } catch (e) {
        throw e;
    }
}
