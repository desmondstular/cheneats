/**
 * index.js
 *
 * Starts backend application using express to connect
 * to a MongoDB database.
 */

import express from "express";

const port = 8000;
const app = express();

// Express built in body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes

// Configure listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
