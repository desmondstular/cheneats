/**
 * restaurant.controller.js
 *
 * Contains controller functions for restaurants.
 */
import {
	createRestaurantInRepo,
	deleteRestaurantFromRepo,
	getRestaurantFromRepo,
	updateRestaurantInRepo
} from "../repos/restaurant.repo.js";

/**
 * Returns a list of all restaurants in the database.
 */
export const getRestaurants = async (req, res, next) => {
	try {
		const restaurants = await getRestaurantFromRepo();
		res.status(200).send(restaurants);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Returns a restaurant from the database by their id.
 */
export const getRestaurant = async (req, res, next) => {
	const {id} = req.params;
	try {
		const restaurant = await getRestaurantFromRepo({id: id});
		res.status(200).send(restaurant);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Updates a restaurant in the database by their id.
 */
export const updateRestaurant = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const restaurant = await updateRestaurantInRepo({id: id}, body);
		res.status(200).send(restaurant);
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}

/**
 * Deletes a restaurant in the database by their id.
 */
export const deleteRestaurant = async (req, res, next) => {
	const {id} = req.params;
	try {
		const restaurantDeleted = await deleteRestaurantFromRepo({id: id});
		if (restaurantDeleted) {
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
 * Creates a new restaurant in the database.
 */
export const createRestaurant = async(req, res, next) => {
	const {body} = req;
	try {
		const restaurant = await createRestaurantInRepo(body);
		console.log("New restaurant:\n", restaurant);
		res.status(200).send();
	} catch (e) {
		next();
		res.status(500).send(e.message);
	}
}