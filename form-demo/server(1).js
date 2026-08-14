const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs'); //

// Middleware to parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true })); //

// GET Route: Render the form page
app.get('/', (req, res) => {
  res.render('index'); // Looks for views/index.ejs
});

// POST Route: Handle the form submission
app.post('/submit', (req, res) => {
  // Capture submitted form fields via req.body
  const { username, email } = req.body;

  // Render the result page and pass the submitted data into the view
  res.render('result', { 
    user: username, 
    userEmail: email 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});