/**
 * order.model.js
 *
 * Contains a Mongoose model for a food order.
 */

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        "customer_ref": {type: mongoose.Types.ObjectId, ref: "customer", required: true},
        "restaurant_ref": {type: mongoose.Types.ObjectId, ref: "restaurant", required: true},
		"staff_ref": {type: mongoose.Types.ObjectId, ref: "staff"},
		"pickup_time": {type: String},
        "items": [{
            "menu_ref": {type: mongoose.Types.ObjectId, ref: "menu"},
            "name": {type: String},
            "quantity": {type: Number, min: 1},
			"subtotal": {type: Number, min: 0}
        }],
        "total": {type: Number},
        "status": {type: String, value: ["carted","ordered", "in-progress", "awaiting-pickup", "completed"]}
    },
    {
        timestamps: true,
        strictQuery: true
    }
);

const OrderModel = new mongoose.model("order", orderSchema);

export default OrderModel;
