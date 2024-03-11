/**
 * order.controller.js
 *
 * Contains controller functions for restaurants.
 */
import {
    createOrderInRepo,
    deleteOrderFromRepo,
    getOrderFromRepo,
    updateOrderInRepo
} from "../repos/order.repo.js";

/**
 * Returns a list of all orders in the database.
 */
export const getOrders = async (req, res, next) => {
    try {
        const restaurants = await getOrdersFromRepo();
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
        const order = await getOrderFromRepo({id: id});
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
        const order = await updateOrderInRepo({id: id}, body);
        res.status(200).send(order);
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
        const orderDeleted = await deleteOrderFromRepo({id: id});
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
    const {body} = req;
    try {
        const order = await createOrderInRepo(body);
        console.log("New order:\n", order);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
}