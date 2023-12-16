import Post from '../models/posts.js';
import User from '../models/user.js';

/* Create */
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body; // what the front end sends
        const user = await User.findById(userId); // find the user in the database
        const newPost = new Post({ // create a new post
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            profilePicture: user.profilePicture,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save(); // save the post to the database

        const post = await Post.find(); // find all posts in the database
        res.status(201).json(post); // send all posts to the front end. 201 means something was created
    }
    catch(error){
        res.status(409).json({ message: error.message }); // 409 means conflict
    }
}

/* Read */
export const getFeedPost = async (req, res) => {
    try{
        res.status(200).json(res.posts); // 200 means OK
    }
    catch(error){
        res.status(404).json({ message: error.message }); // 404 means not found
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params; // what the front end sends
        const posts = await Post.find({ userIds: userId }); // find all posts from a specific user
        res.status(200).json(res.posts); // 200 means OK
    }
    catch(error){
        res.status(404).json({ message: error.message }); // 404 means not found
    }
}

/* Update */
export const likePost = async (req, res) => {
    try{
        const { id } = req.params; // comes from query string
        const { userId } = req.body; // comes from request body
        const post = await Post.findById(id); // find the post in the database
        const isLiked = post.likes.get(userId); // check if the post is liked by the user
        if(isLiked){
            post.likes.delete(userId); // unlike the post
        }
        else{
            post.likes.set(userId, true); // like the post
        }
        // update the front end with the updated post
        const updatedPost = await Post.findByIdAndUpdate(id, { likes : post.likes }, { new: true }); // update the post in the database

        res.status(200).json(res.posts); // 200 means OK
    }
    catch(error){
        res.status(404).json({ message: error.message }); // 404 means not found
    }
}