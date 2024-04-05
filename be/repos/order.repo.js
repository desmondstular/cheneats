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
        order.total = parseFloat(order.total.toFixed(2));
        // Save the updated order document
        const updatedOrder = await order.save();

        return updatedOrder;
    } catch (error) {
        throw error;
    }
};

export const removeItemFromOrderRepo = async (query, itemToRemove) => {
    try {
        // Find the order document by its ID
        const order = await Order.findOne(query);

        if (!order) {
            throw new Error('Order not found');
        }
        // Find the index of the item to remove
        const indexToRemove = order.items.findIndex(item => item._id.toString() === itemToRemove._id.toString());

        if (indexToRemove === -1) {
            throw new Error('Item not found in order');
        }

        // Remove the item from the items array
        const removedItem = order.items.splice(indexToRemove, 1)[0];

        // Subtract the subtotal of the removed item from the order's total
        order.total -= itemToRemove.subtotal.toFixed(2);
        order.total = parseFloat(order.total.toFixed(2));

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

/**
 * Gets all orders for a specific customer and populates
 * all object references.
 */
export const getOrdersByCustomerPopulated = async (query) => {
	try {
		const orders = await Order.find(query)
			.populate('restaurant_ref')
			.populate('staff_ref')
			.populate({
				path: 'items',
				populate: 'menu_ref'});
		return orders;
	} catch (e) {
		throw e;
	}
}
export const getCartedOrdersByCustomerIdRepo = async (query) => {
    try {
        return await Order.find(query)
    } catch (e) {
        throw e;
    }
}