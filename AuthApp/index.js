/**
 * AuthApp - Authentication & Authorization Backend Entry Point
 * Sets up Express app, connects to MongoDB via Mongoose, mounts middleware
 * (including JSON body parser and cookie parser), and exposes API routes.
 */

const express = require('express');  
const cookieParser = require('cookie-parser');  

// Initialize Express server instance
const app = express();  

// Load environment variables from .env file into process.env
require('dotenv').config();  

// Define application server port from environment or fallback to 4000
const PORT = process.env.PORT || 4000;  

// --- MIDDLEWARE CONFIGURATION ---
// Parse incoming JSON body payloads
app.use(express.json());  

// Parse HTTP cookies attached to client requests (required for reading JWT tokens stored in cookies)
app.use(cookieParser());  

// --- DATABASE CONNECTION ---
// Establish connection to MongoDB database
require('./config/database').connect();  

// --- ROUTE IMPORT AND MOUNTING ---
// Import user authentication and authorization routes
const user = require("./routes/user");  

// Mount user authentication routes at base endpoint '/api/v1'
app.use('/api/v1', user);  

// --- SERVER INITIALIZATION ---
// Start listening for incoming HTTP connections
app.listen(PORT, () => {  
  console.log(`App is listening at http://localhost:${PORT}`);  
});
