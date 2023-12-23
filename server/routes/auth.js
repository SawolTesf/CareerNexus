// This file contains all the routes for the authentication process. This includes login, logout, and register.
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // Create router. This is like a mini app in express that we can use to handle routes.

router.post("/login", login); // Login user. This is the route that the user will hit when they try to login.

export default router;