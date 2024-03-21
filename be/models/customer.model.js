/**
 * customer.model.js
 *
 * A Mongoose schema for a Customer Model.
 */

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        "email": {type: String, required: true, unique: true},
        "name": {type: String, required: true},
        "phone": {type: String}
    },
    {strictQuery: true}
);

const Customer = new mongoose.model("customer", CustomerSchema);

export default Customer;
