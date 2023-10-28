import mongoose from 'mongoose';

// UserSchema defines the structure of documents in the User collection
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 1, // Minimum length of 1 character for first name
            max: 50, // Maximum length of 50 characters for first name
        },
        lastName: {
            type: String,
            required: true,
            min: 1, // Minimum length of 1 character for last name
            max: 50, // Maximum length of 50 characters for last name
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true, // Email must be unique (no duplicate accounts)
        },
        password: {
            type: String,
            required: true,
            minlength: 8, // Minimum length of 8 characters
            maxlength: 50, // Maximum length of 50 characters
            match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // Requires at least one uppercase letter, one lowercase letter, one number, and one special character
        },
        picturePath: {
            type: String,
            default: "", // Default profile picture is blank
        },
        connections: {
            type: Array,
            default: [], // Default connections list is empty
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const User = mongoose.model("User", UserSchema); // Create User model
export default User; // Export User model