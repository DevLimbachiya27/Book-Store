📖 Project Overview: Book Store Management System
A robust, full-stack web application designed to streamline the inventory and management of a digital bookstore. Built using the MERN (specifically MEN) stack, this system provides a seamless interface for administrators to handle book records with real-time database integration and dynamic image processing.

🚀 Key Features
Full CRUD Operations: Comprehensive functionality to Create, Read, Update, and Delete book records.

Dynamic Image Upload: Integrated Multer middleware to handle book cover uploads, ensuring a visual catalog.

Server-Side Rendering: Utilizes EJS (Embedded JavaScript) templates for a fast and dynamic frontend experience.

Persistent Storage: Powered by MongoDB for secure and scalable data management.

MVC Architecture: Organized code structure separating Models, Views, and Controllers for professional-grade maintainability.

🛠️ Technical Stack
Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Frontend: EJS, CSS3, Bootstrap (for responsive UI)

Middleware: Multer (File Uploads), Express.js Body-Parser

Development Tools: Nodemon, Git/GitHub

📂 Folder Structure
Plaintext
Book-Store-System/
├── controllers/    # Logic for CRUD operations
├── models/         # MongoDB Schema (Book.js)
├── routes/         # Express Router for navigation
├── views/          # EJS Templates (Add, Edit, View All)
├── public/
│   └── uploads/    # Stored book cover images
├── config/         # Database connection setup
├── app.js          # Entry point of the application
└── package.json    # Dependencies and scripts
📋 MongoDB Schema Design
The system stores data using the following structure:

Title: String

Author: String

Category: String

Price: Number

Quantity: Number

Description: String

Image: String (Path to the uploaded file)

⚙️ How to Run
Clone the repository.

Run npm install to install dependencies.

Configure your MongoDB URI in the config file.

Start the server using nodemon app.js.

Open localhost:3000 in your browser.
<img width="1920" height="1032" alt="Screenshot 2026-05-04 013154" src="https://github.com/user-attachments/assets/aae20ec9-dab1-4c4d-90a8-1f747f4b2780" />
