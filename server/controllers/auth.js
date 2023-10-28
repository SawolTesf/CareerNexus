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
            connections,
            location,
            occupation,
        } = req.body; // Get request body
        
        const salt = await bcrypt.genSalt(); // Called a salt because it adds a unique string of characters to the password hash to make it more secure
        const passwordHash = await bcrypt.hash(password, salt); // Hash password with salt

        const newUser = new User({ // Create new user
            firstName,
            lastName,
            email,
            password: passwordHash, // Store password hash instead of plain text password
            picturePath,
            connections,
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

/* Login user */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body; // Get request body
        const user = await User.findOne({ email }); // Find user with matching email
        if(!user){ // If user does not exist
            return res.status(404).json({ error: "User does not exist" }); // Return error message. 404 is HTTP status code for "Not Found"
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare password with password hash
        if(!isMatch){ // If password is incorrect
            return res.status(400).json({ error: "Invalid credentials" }); // Return error message. 400 is HTTP status code for "Bad Request"
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Create JWT token
        delete user.password; // Delete password from user object so it is not sent to client
        
        res.status(200).json(user); // Return user if successful. 200 is HTTP status code for "OK"
    }
    catch(error){
        res.status(500).json({ error: error.message }); // Return error message if unsuccessful. 500 is HTTP status code for "Internal Server Error"
    }
}