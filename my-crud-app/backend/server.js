/**
 * My CRUD App - Express REST API Server
 * Entry point for backend services serving product CRUD routes.
 * Enables Cross-Origin Resource Sharing (CORS) for React frontend integration.
 */

const express = require("express");  
const cors = require("cors");  

// Initialize Express application server instance
const app = express();  
const PORT = process.env.PORT || 5000;  

// --- MIDDLEWARE CONFIGURATION ---
// Enable CORS to allow cross-origin requests from the React frontend (running on port 5173/3000)
app.use(cors());  

// Parse incoming requests with JSON payloads
app.use(express.json());  

// --- ROUTE MOUNTING ---
// Import product router containing CRUD controller endpoints
const productRoutes = require("./routes/productRoutes");  

// Mount product route handler at the base endpoint path '/api/products'
app.use("/api/products", productRoutes);  

// --- SERVER INITIALIZATION ---
// Start backend HTTP server listening on specified port
app.listen(PORT, () => {  
  console.log(`Server Running at http://localhost:${PORT}`);  
});
