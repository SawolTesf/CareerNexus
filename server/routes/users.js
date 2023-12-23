// This file contains all the routes for the users. This includes getting all users, getting all connections of a user, and adding or removing connections. Notice that we are using the verifyToken middleware to verify that the user is logged in before they can add or remove connections.

import express from "express";
import{
    getUsers,
    getUserConnections,
    addRemoveConnections,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); // Create router

/* Read */
router.get("/:id", verifyToken, getUsers); // grab id and find user through that
router.get("/:id/connections", verifyToken, getUserConnections); // grab id of connections and find them

/* Update */
router.patch("/:id/connections", verifyToken, addRemoveConnections); // add or remove connections

export default router; // Export router