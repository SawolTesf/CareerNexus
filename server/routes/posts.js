// This file contains all the routes for the posts. This includes getting all posts from users that the current user follows and getting all posts from a specific user so only their posts are shown on their profile. It also includes liking and unliking a post. Notice that we are using the verifyToken middleware to verify that the user is logged in before they can like or unlike a post.

import express from 'express';
import { getFeedPost, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); // Create Express router used for routing HTTP requests

/* Read */
router.get("/", verifyToken, getFeedPost); // Get all posts from users that the current user follows
router.get("/usesrID/posts", verifyToken, getUserPosts); // Get all posts from a specific user so only their posts are shown on their profile

/* Update */
router.patch("/:id/like", verifyToken, likePost); // Like a post and unlike a post

export default router; // Export router to be used in server/index.js