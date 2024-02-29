/**
 * home.route.js
 *
 * Home route on backend server which notifies user if the
 * server is online.
 */

import express from "express";

const router = express.Router();

// Sends back a message indicating server is online
router.get("/", async (req, res) => {
    res.status(200).send("Server is online");
});

export default router;
