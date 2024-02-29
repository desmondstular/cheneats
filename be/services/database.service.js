/**
 * database.service.js
 *
 * Connects to MongoDB.
 */

import mongoose from "mongoose";

const localUrl = "mongodb://localhost:27017/315fp"
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(localUrl);
        console.log("Connected to database");
    } catch (e) {
        console.log("Could not connect to database");
    }
};

export default connectDB;
