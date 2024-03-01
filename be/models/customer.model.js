/**
 * customer.model.js
 *
 * A Mongoose schema for a Customer Model.
 */

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        "id": {type: Number, required: true, unique: true},
        "email": {type: String, required: true, unique: true},
        "name": {type: String, required: true},
        "phoneNumber": {type: Number}
    },
    {strictQuery: true}
);

const Customer = new mongoose.model("Customer", CustomerSchema);

export default Customer;
