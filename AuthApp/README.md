AuthApp - User Authentication & Authorization System
A secure Node.js, Express, and MongoDB authentication and authorization backend system featuring password encryption, JWT authentication, cookie management, and role-based access control.
🚀 Features
-	User Authentication: Secure registration and login routes.
-	Password Hashing: Uses bcrypt to hash and salt user passwords prior to database storage.
-	JWT Authorization: Issues JSON Web Tokens upon authentication and verifies signatures via custom middleware.
-	Cookie Management: Stores JWTs in HTTP cookies using cookie-parser.
-	Database Integration: Object Data Modeling (ODM) using Mongoose and MongoDB connection pooling.
-	Role-Based Access Control (RBAC): Protected routes restricted by user roles (e.g., Student, Admin).
🛠️ Tech Stack
-	Node.js & Express.js
-	MongoDB & Mongoose
-	JSON Web Token (jsonwebtoken)
-	Bcrypt (bcrypt)
-	Cookie Parser (cookie-parser)
-	Dotenv (dotenv)
📂 Project Structure
AuthApp/

├── config/            # Database configuration & connection

├── controllers/       # Auth controller logic (login, signup)

├── middlewares/       # Authentication & RBAC middleware

├── models/            # Mongoose user schema

├── routes/            # API routes (/api/v1)

├── .env               # Environment configuration file

├── index.js           # Express app entry point

└── package.json       # Project dependencies
🏁 Getting Started
1. Environment Variables
Create or verify .env file in the root directory:

PORT=4000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
2. Installation & Running
# Install dependencies

npm install

# Run in development mode

npm run dev

Server starts on http://localhost:4000.
