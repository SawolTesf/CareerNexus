import jwt from "jsonwebtoken"; // Import JSON Web Token

/* Middleware functions are functions that are executed between the client's request and the server's response. They can be used to perform various tasks such as logging, authentication, validation, and error handling. */

export const verifyToken = (req, res, next) => { // Middleware function to verify token
    try{
        let token = req.header("Authorization"); // Get token from request header

        if(!token){ // If token does not exist
            return res.status(403).json({ error: "Unauthorized" }); // Return error message. 403 is HTTP status code for "Forbidden"
        }

        if(token.startsWith("Bearer ")){ // If token starts with "Bearer "
            // Remove "Bearer " from token. Bearer is a type of token that is sent in the Authorization header and we don't need it
            token = token.slice(7, token.length).trimLeft(); // 7 is the length of "Bearer " so we remove it from the token. trimLeft() removes whitespace from the left side of the string
            const verify = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            req.user = verify; // Set user to verified token
            next(); // Call next middleware function
        }
    }
    catch(error){
        res.status(401).json({ error: "Unauthorized" }); // Return error message. 401 is HTTP status code for "Unauthorized"
    }

}