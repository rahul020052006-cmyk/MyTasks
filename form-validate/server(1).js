const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Temporary in-memory storage for validated submissions
const database = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Server-side validation rules
const registrationValidationRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('role')
    .notEmpty().withMessage('Role selection is required.')
    .isIn(['developer', 'designer', 'manager']).withMessage('Invalid role selected.')
];

// Form Submission Route
app.post('/api/register', registrationValidationRules, (req, res) => {
  const errors = validationResult(req);

  // If server-side validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }

  // Extract clean data (excluding password from long-term storage for security)
  const { username, email, role } = req.body;
  const newUser = {
    id: database.length + 1,
    username,
    email,
    role,
    submittedAt: new Date()
  };

  // Store in-memory
  database.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: newUser
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});