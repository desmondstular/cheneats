/**
 * menu.model.js
 */

import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
	{
		"restaurant_ref": {type: mongoose.Types.ObjectId, ref: 'restaurant'},
		"name": {type: String, required: true},
		"price": {type: Number, required: true},
		"discount": {type: Number, required: true},
		"image": {type: String, required: true},
		"available": {type: Boolean, required: true},
		"on_special": {type: Boolean, required: true}
	},
	{
		strictQuery: true
	}
);

const MenuModel = new mongoose.model("menu", menuSchema);

export default MenuModel;
