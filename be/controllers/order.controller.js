/**
 * order.controller.js
 *
 * Contains controller functions for restaurants.
 */
import {
    addItemToOrderRepo,
    removeItemFromOrderRepo,
    createOrderInRepo,
    deleteOrderFromRepo,
    getOrderFromRepo,
    getOrdersByCustomerPopulated,
    getOrdersByRestaurantPopulated,
    updateOrderInRepo, getCartedOrdersByCustomerIdRepo

} from "../repos/order.repo.js";
import mongoose from "mongoose";
import {getMenuFromRepo} from "../repos/menu.repo.js";
import res from "express/lib/response.js";

/**
 * Returns a list of all orders in the database.
 */
export const getOrders = async (req, res, next) => {
    try {
        const restaurants = await getOrderFromRepo();
        res.status(200).send(restaurants);
    } catch (e) {
        next(e);
    }
}

/**
 * Returns an order from the database by their id.
 */
export const getOrder = async (req, res, next) => {
    const {id} = req.params;
    try {
        const order = await getOrderFromRepo({_id: id});
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
}

export const getCartedOrderByCustomerIdRestaurantId = async (req, res, next) => {
    const { restaurant_id, customer_id } = req.params;
    try {
        const order = await getOrderFromRepo({
            customer_ref: customer_id,
            restaurant_ref: restaurant_id,
            status: 'carted'
        });
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
}


/**
 * Updates an order in the database by their id.
 */
export const updateOrder = async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const order = await updateOrderInRepo({_id: id}, body);
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
}


export const addItemToOrder = async (req, res, next) => {
    const { id, restaurant_id, customer_id } = req.params; // Extract order ID, restaurant ID, and customer ID from req.params
    const { newItem} = req.body;

    try {
        // Call addItemToOrderRepo with the correct parameters
        const order = await addItemToOrderRepo({_id: id}, newItem);

        res.status(200).json(order);
    } catch (e) {
        next(e);
    }
};
export const removeItemFromOrder =  async (req, res, next) => {
    const {id, item_id} = req.params;
    const itemToRemove  = req.body;

    try {
        console.log(id)
        console.log(itemToRemove)
        const order = await removeItemFromOrderRepo ({_id: id}, itemToRemove);
        res.status(200).json(order);
    } catch (e) {
        next(e);
    }
}



/**
 * Deletes an order in the database by their id.
 */
export const deleteOrder = async (req, res, next) => {
    const {id} = req.params;
    try {
        const orderDeleted = await deleteOrderFromRepo({_id: id});
        if (orderDeleted) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (e) {
        next(e);
    }
}

/**
 * Creates an order in the database.
 */
export const createOrder = async(req, res, next) => {
    const { body } = req;
    try {
        const order = await createOrderInRepo(body.restaurant_ref, body.customer_ref, "carted", 0.00);
        console.log("New order:\n", order);
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }
}

/**
 * Sends orders with customer, staff, menu object references
 * for a specific restaurant.
 */
export const getOrderByRestaurantFull = async(req, res, next) => {
	const {restaurant_ref} = req.params;
	try {
		const orders = await getOrdersByRestaurantPopulated(
			{ 'restaurant_ref': restaurant_ref }
		);
		res.status(200).send(orders);
	} catch (e) {
		next(e);
	}
}

/**
 * Sends orders with restaurant, staff, menu object references
 * for a specific customer.
 */
export const getOrderByCustomerFull = async(req, res, next) => {
	const {customer_ref} = req.params;
	try {
		const orders = await getOrdersByCustomerPopulated(
			{ 'customer_ref': customer_ref }
		);
		res.status(200).send(orders);
	} catch (e) {
		next(e);
	}
}
export const getCartedOrdersByCustomerId = async (req, res, next) => {
    const { customer_ref } = req.params;
    try {
        const orders = await getCartedOrdersByCustomerIdRepo({
            "customer_ref": customer_ref,
            "status": "carted"
        });
        res.status(200).send(orders);
    } catch (e) {
        next(e);
    }
}
