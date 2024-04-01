/**
 * menu.controller.js
 *
 * Contains controller functions for menu items.
 */
import {
	createMenuInRepo,
	deleteMenuFromRepo,
	getMenuFromRepo,
	updateMenuInRepo,
	getMenuByRestaurantFromRepo
} from "../repos/menu.repo.js";

/**
 * Returns a list of menu items from the database.
 */
export const getMenus = async (req, res, next) => {
	try {
		const menus = await getMenuFromRepo();
		res.status(200).send(menus);
	} catch (e) {
		next(e);
	}
}

/**
 * Returns a specific menu item from the database by their id.
 */
export const getMenu = async (req, res, next) => {
	const {id} = req.params;
	try {
		const menu = await getMenuFromRepo({_id: id});
		res.status(200).send(menu);
	} catch (e) {
		next(e);
	}
}

/**
 * Returns menu items from the database for a specific restaurant.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const getMenuByRestaurant = async (req, res, next) => {
    const { restaurantId } = req.params;
    try {
        const menus = await getMenuByRestaurantFromRepo(restaurantId);
        res.status(200).send(menus);
    } catch (error) {
        next(error);
    }
};

/**
 * Updates a menu in the database by their id.
 */
export const updateMenu = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const menu = await updateMenuInRepo({_id: id}, body);
		res.status(200).send(menu);
	} catch (e) {
		next(e);
	}
}

/**
 * Deletes a menu in the database by their id.
 */
export const deleteMenu = async (req, res, next) => {
	const {id} = req.params;
	try {
		const menuDeleted = await deleteMenuFromRepo({_id: id});
		if (menuDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	} catch (e) {
		next(e);
	}
}

/**
 * Creates a new menu in the database.
 */
export const createMenu = async(req, res, next) => {
	const {body} = req;
	try {
		const menu = await createMenuInRepo(body);
		console.log("New Menu:\n", menu);
		res.status(200).send();
	} catch (e) {
		next(e);
	}
}