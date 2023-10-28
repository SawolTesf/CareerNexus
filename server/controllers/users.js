import User from "../models/user";

/* The use of async/await is to avoid callback hell. This makes the code more readable and easier to debug.
async: asynchronous function which means it returns a promise which is resolved when it completes or rejected when it fails.
await: wait for promise to resolve.
promise: object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. */

/* Read */
export const getUsers = async (req, res) => { // req: HTTP request, res: HTTP response. async: asynchronous function which means it returns a promise which is resolved when it completes or rejected when it fails.
    try {
        const { id } = req.params; // Get id from request parameters
        const user = await User.findById(id); // Find user by id
        res.status(200).json(user); // Return user with status 200: OK
    }
    catch (error) {
        res.status(404).json({ message: error.message }); // Return error. 404: Not Found
    }
}

export const getUserConnections = async (req, res) => {
    try{
        const { id } = req.params; // Get id from request parameters
        const user = await User.findById(id); // Find user by id. await: wait for promise to resolve.
    
        const connections = await Promise.all( // Find all connections. Promise.all: wait for all promises to resolve which means all connections are found.
            user.connections.map((id) => User.findById(id))
        );
        // Format connections which means only return the following fields: _id, firstName, lastName, occupation, location, picturePath in an array. Map method is used to iterate through each connection and return the specified fields.
        const formattedConnections = connections.map(
            ({  _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedConnections); // Return connections
    }
    catch (error) {
        res.status(404).json({ message: error.message }); // Return error. 404: Not Found
    }
};

/* Update */

