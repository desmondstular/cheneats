/**
 * order.model.js
 *
 * Contains a Mongoose model for a food order.
 */

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        "id": {type: Number, required: true, unique: true},
        "customer_ref": {type: mongoose.Types.ObjectId, required: true, unique: true},
        "restaurant_ref": {type: mongoose.Types.ObjectId, required: true, unique: true},
        "items": {type: mongoose.Types.Array, required: true},
        "total": {type: Number, required: true},
        "status": {type: String, required: true, value: ["active", "pending", "complete", "cancelled"]}
    },
    {
        timestamps: true,
        strictQuery: true
    }
);

const orderModel = new mongoose.Model("Order", orderSchema);

export default orderModel;
