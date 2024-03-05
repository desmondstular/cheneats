/**
 * restaurant.model.js
 *
 * A Mongoose schema representing a Restaurant model.
 */

import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        "id": {type: Number, required: true, unique: true},
        "email": {type: String, required: true, unique: true},
        "name": {type: String, required: true},
        "location": {type: String, required: true},
        "phoneNumber": {type: Number, required: true},
        "open_time": {type: String, required: true},
        "closing_time": {type: String, required: true},
        "taking_orders": {type: Boolean, required: true},
        "menu": [{
                "item_name": {type: String, required: true, unique: true},
                "item_price": {type: Number, required: true, unique: true},
                "item_image": {type: Number, required: true, unique: true},
                "sold_out": {type: Boolean, required: true, unique: true}
            }]
    },
    {strictQuery: true}
);

const Restaurant = new mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
