import User from "../models/user";

/* Read */
export const getUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); // Find user by id
        res.status(200).json(user); // Return user
    }
    catch (error) {
        res.status(404).json({ message: error.message }); // Return error. 404: Not Found
    }
}

export const getUserConnections = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id); // Find user by id
    
        const connections = await Promise.all( // Find all connections
            user.connections.map((id) => User.findById(id))
        );
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

