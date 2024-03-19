/**
 * restaurant.model.js
 *
 * A Mongoose schema representing a Restaurant model.
 */

import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        "name": {type: String, required: true},
        "location": {type: String, required: true},
        "phone": {type: String, required: true},
		"cuisine": {type: String, required: true},
        "open_time": {type: String},
        "closing_time": {type: String},
        "accepting_orders": {type: Boolean},
		"image": {type: String, required: true}
    },
    {strictQuery: true}
);

const RestaurantModel = new mongoose.model("restaurant", RestaurantSchema);

export default RestaurantModel;
