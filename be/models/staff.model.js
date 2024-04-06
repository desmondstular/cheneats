/**
 * staff.model.js
 *
 * A mongoose schema for a staff or employee. Links
 * them to a specific restaurant for login.
 */

import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
	{
		"email": {type: String, required: true, unique: true},
		"restaurant_ref": {type: mongoose.Types.ObjectId, ref: "restaurant", required: true},
		"manager": {type: Boolean, required: true}
	},
	{
		strictQuery: true
	}
)

const StaffModel = new mongoose.model("staff", staffSchema);

export default StaffModel;
