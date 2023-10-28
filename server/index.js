import express from "express"; // Import Express framework
import bodyParser from "body-parser"; // Allow parsing of incoming JSON data
import mongoose from "mongoose"; // Allow connection to MongoDB database
import cors from "cors"; // Allow Cross-Origin Resource Sharing (CORS) which allows requests from other domains
import dotenv from "dotenv"; // Allow loading of environment variables from .env file such as database connection string
import multer from "multer"; // Allow file uploads to server such as profile pictures
import helmet from "helmet"; // Set various HTTP headers for security. Security from well-known web vulnerabilities such as XSS, CSRF, etc.
import morgan from "morgan"; // Log HTTP requests to console for debugging
import path from "path"; // Allow working with file and directory paths.
import { fileURLToPath } from "url"; // Allow working with file and directory paths. 
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

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
// 30mb limit to avoid server crash when uploading large files
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON request bodies with size limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse URL-encoded request bodies with size limit
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static assets from public/assets directory

/* File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // req: HTTP request, file: file to be uploaded, cb: callback function
        cb(null, "public/assets"); // Set path to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Set filename to original filename
    },
});
const upload = multer({ storage }); // Create Multer instance for file uploads

/* Routes */
app.use("/auth", authRoutes); // Use auth routes to handle authentication
app.use("/users", usersRoutes); // Use users routes to handle users (CRUD)
/* Routes with files*/
app.post("/auth/register", upload.single("profilePicture"), register); // Register user with profile picture

/* Mongoose setup */
const PORT = process.env.PORT || 60001; // Set port to listen on (default: 60001)

mongoose.connect(process.env.MONGO_URL, { // Connect to MongoDB database
    useNewUrlParser: true, // Use new URL parser which means connection string can be passed to connect method
    useUnifiedTopology: true // Use new server discovery and monitoring engine which means connection string can be passed to connect method
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); // Start listening for requests
}).catch((error) => console.log(`${error} did not connect`)); // Log error if connection fails