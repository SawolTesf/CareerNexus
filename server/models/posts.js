import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: String, // Optional
    description: String, // Optional
    profilePicture: String, // Optional
    postImage: String, // Optional
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    }
}, { timestamps: true }); // Add createdAt and updatedAt fields

const Post = mongoose.model("Post", postSchema); // Create Post model

export default Post; // Export Post model to be used in server/controllers/posts.js

