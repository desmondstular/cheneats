/**
 * orderhistoryhelpers.employee.js
 *
 * Contains helper functions for the employee
 * order history table component.
 */

// Custom sort bys
export const statusSortBy = ["ordered", "in-progress", "awaiting-pickup", "completed"];

/**
 * Sorts a list of order objects by key value using a
 * customer array of values.
 */
export const orderSort = ({ data, sortBy, sortField }) => {
	const sortByObject = sortBy.reduce((obj, item, index) => {
		return {
			...obj,
			[item]: index
		};
	}, {});
	return data.sort(
		(a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
	);
};