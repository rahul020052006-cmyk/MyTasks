/**
 * Form Demo - Express & EJS Server-Side Rendering (SSR) App
 * Demonstrates handling HTML form submissions using URL-encoded middleware
 * and dynamically populating views using the EJS templating engine.
 */

const express = require('express');  
const app = express();  
const PORT = process.env.PORT || 3000;  

// --- VIEW ENGINE CONFIGURATION ---
// Configure EJS as the view templating engine for Express (renders views/*.ejs files)
app.set('view engine', 'ejs');  

// --- MIDDLEWARE CONFIGURATION ---
// Middleware to parse incoming URL-encoded form data (e.g. from standard HTML forms)
app.use(express.urlencoded({ extended: true }));  

// --- ROUTE DEFINITIONS ---
/**
 * GET /
 * Renders the main registration form template (views/index.ejs).
 */
app.get('/', (req, res) => {  
  res.render('index');  
});  

/**
 * POST /submit
 * Captures submitted form payload from req.body and renders confirmation page (views/result.ejs).
 */
app.post('/submit', (req, res) => {  
  // Extract submitted form variables from request body
  const { username, email } = req.body;  

  // Render 'result.ejs' and inject submitted user details into template context
  res.render('result', {   
    user: username,   
    userEmail: email   
  });  
});  

// --- SERVER INITIALIZATION ---
// Start server on designated port
app.listen(PORT, () => {  
  console.log(`Server is running at http://localhost:${PORT}`);  
});
