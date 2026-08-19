My CRUD App - Full-Stack Product Management A full-stack Web application built with a React (Vite) frontend and a Node.js Express backend for performing product CRUD (Create, Read, Update, Delete) operations. 🚀 Features

Full-Stack Architecture: Clean decoupling between frontend SPA and REST API backend.
Express REST API: Serves product data routes with CORS enabled for seamless cross-origin communication.
React Frontend: Modern user interface built with React 19 and Vite for fast development and rendering.
HTTP Client: Axios integration on the frontend for reliable REST API communication. 🛠️ Tech Stack Frontend
React 19
Vite
Axios
Oxlint Backend
Node.js
Express.js
CORS
Nodemon 📂 Project Structure my-crud-app/

├── backend/           # Express backend API

│   ├── controllers/   # Route controllers

│   ├── routes/        # API endpoints (/api/products)

│   ├── data/          # Product dataset

│   ├── server.js      # Server entry point

│   └── package.json

└── frontend/          # React + Vite client app

├── src/           # React components and logic

├── public/        # Static assets

├── vite.config.js # Vite configuration

└── package.json

🏁 Getting Started

Setup Backend cd backend

npm install

npm run dev
Server runs at http://localhost:5000
Setup Frontend cd frontend

npm install

npm run dev
Client runs at http://localhost:5173


