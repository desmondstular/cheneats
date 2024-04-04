/**
 * staff.controller.js
 *
 * Contains controller functions for staff collection.
 */
import {
	createStaffInRepo,
	deleteStaffFromRepo,
	getStaffFromRepo,
	updateStaffInRepo
} from "../repos/staff.repo.js";

/**
 * Returns a list of staff from the database.
 */
export const getStaffs = async (req, res, next) => {
	try {
		const staff = await getStaffFromRepo();
		res.status(200).send(staff);
	} catch (e) {
		next(e);
	}
}

/**
 * Returns a specific staff from the database by their id.
 */
export const getStaff = async (req, res, next) => {
	const {id} = req.params;
	try {
		const staff = await getStaffFromRepo({_id: id});
		res.status(200).send(staff);
	} catch (e) {
		next(e);
	}
}

/**
 * Updates a staff in the database by their id.
 */
export const updateStaff = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const staff = await updateStaffInRepo({_id: id}, body);
		res.status(200).send(staff);
	} catch (e) {
		next(e);
	}
}

/**
 * Deletes a staff in the database by their id.
 */
export const deleteStaff = async (req, res, next) => {
	const {id} = req.params;
	try {
		const staffDeleted = await deleteStaffFromRepo({_id: id});
		if (staffDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	} catch (e) {
		next(e);
	}
}

/**
 * Creates a new staff in the database.
 */
export const createStaff = async(req, res, next) => {
	const {body} = req;
	try {
		const staff = await createStaffInRepo(body);
		console.log("New Staff:\n", staff);
		res.status(200).send();
	} catch (e) {
		next(e);
	}
}

/**
 * Get staff by email.
 */
export const getStaffByEmail = async(req, res, next) => {
	const {email} = req.query;
	try {
		const staff = await getStaffFromRepo({email: email});
		res.status(200).send(staff)
	} catch (e) {
		next(e);
	}
}