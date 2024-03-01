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
        "phoneNumber": {type: Number, required: true}
    },
    {strictQuery: true}
);

const Restaurant = new mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
