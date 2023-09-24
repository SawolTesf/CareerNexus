import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // Create router

router.post("/login", login); // Login user

export default router;