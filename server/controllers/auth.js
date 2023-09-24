import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/* Register user */
// Async function to register user
export const register = async (req, res) => { // req = HTTP request, res = HTTP response
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body; // Get request body
        
        const salt = await bcrypt.genSalt(); // Called a salt because it adds a unique string of characters to the password hash to make it more secure
        const passwordHash = await bcrypt.hash(password, salt); // Hash password with salt

        const newUser = new User({ // Create new user
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0,
        });
        const savedUser = await newUser.save(); // Save new user to database
        res.status(201).json(savedUser); // Return saved user if successful. 201 is HTTP status code for "Created"
    }
    catch(error){
        res.status(500).json({ error: error.message }); // Return error message if unsuccessful. 500 is HTTP status code for "Internal Server Error"
    }
}