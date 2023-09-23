import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/* Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up middleware
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Set various HTTP headers for security
app.use(morgan("common")); // Log HTTP requests to console
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON request bodies with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded request bodies with size limit
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static assets from public/assets directory

/* File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets"); // Set path to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Set filename to original filename
    },
});
const upload = multer({ storage }); // Create Multer instance for file uploads

/* Mongoose setup */
const PORT = process.env.PORT || 60001; // Set port to listen on (default: 60001)

mongoose.connect(process.env.MONGO_URL, { // Connect to MongoDB database
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use new server discovery and monitoring engine
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); // Start listening for requests
}).catch((error) => console.log(`${error} did not connect`)); // Log error if connection fails