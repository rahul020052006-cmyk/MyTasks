Complex Form - Dynamic Form & Hash Routing
A lightweight, vanilla JavaScript single-page application demonstrating advanced client-side form validation, real-time UI updates, dynamic conditional fields, and hash-based routing.
🚀 Features
-	Hash-Based Client Router: Smooth, reload-free navigation between form views (#signup) and dashboard views (#dashboard).
-	Real-Time Validation:
-	Email format validation using regular expressions.
-	Password strength meter assessing length, uppercase characters, digits, and special characters.
-	Live password confirmation matching.
-	Dynamic Conditional Fields: Account type selection dynamically reveals or hides context-specific inputs (e.g., Company Name for Business accounts).
-	Interactive Progress Bar: Visual progress indicator reflecting valid completion percentage across required form fields.
-	Form State Management: Submit button automatically enables when all required validations pass.
🛠️ Tech Stack
-	HTML5: Semantic document markup and view containers.
-	CSS3: Custom styles, responsive layout flexbox, strength/progress indicators.
-	JavaScript (ES6+): Event-driven DOM manipulation and client-side routing.
📂 Project Structure
Complex-form/

├── index.html     # HTML structure with hash-based view sections

├── style.css      # Custom UI styles and status indicators

└── app.js         # Validation logic, progress tracking, and hash router
🏁 How to Run
1.	Open index.html directly in any modern web browser or serve it using a local development server (e.g., Live Server).
2.	Navigate between #signup and #dashboard using the form controls.



