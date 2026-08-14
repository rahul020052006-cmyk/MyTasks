/**
 * Form Validate - Express Server with express-validator
 * Demonstrates robust server-side input validation, sanitization,
 * structured JSON error formatting, and in-memory user record management.
 */

const express = require('express');  
const { body, validationResult } = require('express-validator');  
const path = require('path');  

// Initialize Express application instance and set port
const app = express();  
const PORT = process.env.PORT || 3000;  

// Simulated in-memory database array for demonstration
const database = [];  

// --- MIDDLEWARE CONFIGURATION ---
// Parse incoming JSON payloads in request bodies
app.use(express.json());  
// Parse URL-encoded form submissions (HTML form payloads)
app.use(express.urlencoded({ extended: true }));  
// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));  

// --- VALIDATION & SANITIZATION RULES ---
/**
 * express-validator middleware chain for user registration fields.
 * Sanitizes input (trimming, normalizing) and enforces structural constraints.
 */
const registrationValidationRules = [  
  // Username: Trim whitespace, ensure non-empty, enforce minimum length of 3 chars
  body('username')  
    .trim()  
    .notEmpty().withMessage('Username is required.')  
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),  
  
  // Email: Trim whitespace, verify standard email format, normalize email address
  body('email')  
    .trim()  
    .notEmpty().withMessage('Email is required.')  
    .isEmail().withMessage('Please provide a valid email address.')  
    .normalizeEmail(),  
  
  // Password: Require non-empty string with minimum 6 characters
  body('password')  
    .notEmpty().withMessage('Password is required.')  
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),  
  
  // Role: Enforce selection from allowed enum roles ('developer', 'designer', 'manager')
  body('role')  
    .notEmpty().withMessage('Role selection is required.')  
    .isIn(['developer', 'designer', 'manager']).withMessage('Invalid role selected.')  
];  

// --- API ROUTES ---
/**
 * POST /api/register
 * Handles user registration form submissions with validation middleware.
 */
app.post('/api/register', registrationValidationRules, (req, res) => {  
  // Extract validation results evaluated by express-validator middleware
  const errors = validationResult(req);  

  // Respond with 400 Bad Request if validation rules were violated
  if (!errors.isEmpty()) {  
    return res.status(400).json({  
      success: false,  
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))  
    });  
  }  

  // Extract sanitized input fields (exclude plaintext password from persistent storage)
  const { username, email, role } = req.body;  
  const newUser = {  
    id: database.length + 1,  
    username,  
    email,  
    role,  
    submittedAt: new Date()  
  };  

  // Store new record in simulated in-memory array
  database.push(newUser);  

  // Respond with 201 Created status and new user object metadata
  res.status(201).json({  
    success: true,  
    message: 'User registered successfully!',  
    user: newUser  
  });  
});  

// --- SERVER INITIALIZATION ---
// Start listening for incoming HTTP connections
app.listen(PORT, () => {  
  console.log(`Server running on http://localhost:${PORT}`);  
});
