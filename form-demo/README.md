Form Demo - Express & EJS Server-Side Rendering
An Express.js web application showcasing server-side HTML rendering (SSR) using the EJS templating engine and form data handling.
🚀 Features
-	Server-Side Rendering (SSR): Dynamic page rendering using EJS template files.
-	Form Data Processing: URL-encoded middleware parsing form payloads sent via HTTP POST requests.
-	View Templating:
-	index.ejs: Renders an interactive HTML form collecting user information.
-	result.ejs: Displays personalized submission responses populated dynamically from backend route state.
🛠️ Tech Stack
-	Node.js: Runtime environment.
-	Express.js (^5.2.1): Backend framework.
-	EJS (^6.0.1): Embedded JavaScript templating engine.
📂 Project Structure
form-demo/

├── server.js          # Main application logic and routing

├── package.json       # Project configuration

├── package-lock.json  # Dependency tree details

└── views/             # EJS templates directory

    ├── index.ejs      # Initial form page

    └── result.ejs     # Submission confirmation view
🏁 Getting Started
Prerequisites
-	Node.js (v18+)
-	npm
Installation & Execution
# Install dependencies

npm install

# Start server

node server.js

Open http://localhost:3000 in your web browser.


