// Library for hashing passwords. Hashing is a one-way function that turns a password into a long string of characters. It is not possible to turn the hash back into the password. This is more secure than storing passwords as plain text because if a hacker gains access to the database, they will not be able to see the passwords. The only way to check if a password is correct is to hash the password the user enters and compare it to the hash stored in the database. If the hashes match, the password is correct. If the hashes do not match, the password is incorrect.
import bcrypt from 'bcrypt'; 
// Library for creating JSON Web Tokens (JWT). JWTs are used for authentication. When a user logs in, a JWT is created and sent to the client. The client then sends the JWT with every request to the server. The server can verify the JWT to make sure the user is logged in.
import jwt from 'jsonwebtoken';
// User model which contains the user schema. The schema is used to create a new user in the database.
import User from '../models/user.js';

/* Register user */

// Async function to register user
export const register = async (req, res) => { // req = HTTP request, res = HTTP response. A HTTP is essentially a message sent from the client to the server. The server then sends a HTTP response back to the client. The HTTP request contains information about the request such as the URL, HTTP method, headers, and body. The HTTP response contains information about the response such as the HTTP status code, headers, and body. The respo
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