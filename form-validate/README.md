Form Validate - Express Server-Side Validation API
A Node.js and Express backend service demonstrating robust server-side data validation, sanitization, and error handling for user registration workflows.
🚀 Features
-	Server-Side Input Validation: Validates user registration fields (username length, email format, password security, role selection).
-	Data Sanitization: Normalizes emails and trims whitespace from inputs before processing.
-	Structured Error Handling: Returns field-specific error messages in standard JSON format on 400 Bad Request.
-	In-Memory Storage: Simulates database insertion for validated user registrations on 201 Created.
-	Static File Serving: Express middleware serving public static assets.
🛠️ Tech Stack
-	Node.js: JavaScript runtime environment.
-	Express.js (^5.2.1): Web framework for routes and middleware.
-	express-validator (^7.3.2): Middleware for server-side validation and sanitization.
📂 Project Structure
form-validate/

├── server.js          # Express server setup, routes, and validation rules

├── package.json       # Project dependencies and metadata

├── package-lock.json  # Dependency lockfile

└── public/            # Static assets directory
🏁 Getting Started
Prerequisites
-	Node.js (v18+ recommended)
-	npm
Installation
npm install
Running the Server
node server.js

The server will run on http://localhost:3000.
📡 API Endpoints
-	POST /api/register - Registers a new user.
-	Body: { "username": "string", "email": "string", "password": "string", "role": "developer|designer|manager" }

