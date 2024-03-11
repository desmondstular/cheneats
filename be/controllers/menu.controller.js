/**
 * menu.controller.js
 *
 * Contains controller functions for menu items.
 */
import {
	createMenuInRepo,
	deleteMenuFromRepo,
	getMenuFromRepo,
	updateMenuInRepo
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
		const menu = await getMenuFromRepo({id: id});
		res.status(200).send(menu);
	} catch (e) {
		next(e);
	}
}

/**
 * Updates a menu in the database by their id.
 */
export const updateMenu = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const menu = await updateMenuInRepo({id: id}, body);
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
		const menuDeleted = await deleteMenuFromRepo({id: id});
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