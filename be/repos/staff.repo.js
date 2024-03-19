/**
 * staff.repo.js
 *
 * Pulls from and pushes data to the staff collection.
 */

import Staff from "../models/staff.model.js";

/**
 * Gets one or more staff from the database.
 */
export const getStaffFromRepo = async (query) => {
	try {
		return await Staff.find(query);
	} catch (e) {
		throw e;
	}
}

/**
 * Updates an existing staff in the database.
 */
export const updateStaffInRepo = async (query, update) => {
	try {
		return await Staff.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

/**
 * Deletes a staff from the database.
 */
export const deleteStaffFromRepo = async (query) => {
	try {
		return await Staff.findOneAndDelete({...query});
	} catch (e) {
		throw e;
	}
}

/**
 * Creates a new staff inside the database.
 */
export const createStaffInRepo = async (payload) => {
	try {
		const newStaff = new Staff(payload);
		return await newStaff.save();
	} catch (e) {
		throw e;
	}
}