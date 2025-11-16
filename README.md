🧠 Project Title: Complete Backend for Project Management App 

🚀 Overview :

This repository contains a fully functional backend API built using Node.js, Express.js, and MongoDB.
It provides all essential functionalities for a project management system — including authentication, project creation, task handling, and team collaboration features.

The project demonstrates production-grade backend architecture with proper folder structuring, middleware usage, validation, and error handling.

🏗️ Features :

✅ User Authentication — Register, Login, Logout with JWT-based auth
✅ Project Management — Create, update, delete, and assign projects
✅ Task & Subtask Handling — CRUD operations for tasks and subtasks
✅ Notes System — Add notes linked to specific projects or tasks
✅ Role-based Access — Secure endpoints using middleware
✅ File Upload Support — Handled via Multer middleware
✅ API Error Handling — Centralized error and async handlers
✅ Modular Codebase — Clean folder structure for scalability
✅ Health Check Endpoint — To verify backend server status

🧩 Tech Stack :
Layer	                                                              Technology
Backend Runtime	                                      Node.js
Framework                                            	Express.js
Database                                            	MongoDB (Mongoose ORM)
Authentication	                                      JWT (JSON Web Token)
Middleware	                                          Multer, Custom Auth & Validator
Utilities                                            	Nodemailer, Async Handler, Custom API Response
Environment Management	                              dotenv

📁 Folder Structure :

src/
│
├── controllers/       # All route controller logic
├── middlewares/       # Custom middlewares (auth, multer, validator)
├── models/            # Mongoose schemas
├── routes/            # API routes (user, project, task, etc.)
├── utils/             # Helper functions and reusable utilities
├── validators/        # Input validation layer
├── db/                # Database connection logic
├── app.js             # Express app setup
└── index.js           # Entry point

⚙️ Installation & Setup :

1️⃣ Clone the repository
git clone https://github.com/nikhilcoder1/ProjectManagementApplication.git

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root directory and configure the following:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the server
npm run dev


Your backend server will be running at:
👉 http://localhost:3000

🧪 API Endpoints :

Method	                    Endpoint	                                        Description
POST	              /api/v1/auth/register	                                Register a new user
POST	              /api/v1/auth/login	                              Login and get access token
POST	              /api/v1/auth/logout	                                      Logout user
GET	                /api/v1/healthcheck	                                    Verify server status
POST	                /api/v1/projects	                                     Create a new project
GET	              /api/v1/projects/:id	                                     Fetch project details
POST	              /api/v1/tasks	                                    Create a task under project
PATCH	          /api/v1/tasks/:id	                                          Update task
DELETE	          /api/v1/tasks/:id	                                        Delete task

(Note: Include all other routes as per your controllers.)

🧰 Development Tools

-> Postman / Thunder Client — for API testing

-> MongoDB Compass — for DB visualization

-> Nodemon — for auto server restart during development

🛠️ Project Highlights :

1.Proper MVC pattern implementation

2. Clean and modular code structure

3. Centralized error and success response format

4. Secure authentication workflow

5. Ready-to-extend structure for production-grade apps

👨‍💻 Author :

Nikhil Pandey:
💼 Aspiring Full Stack Developer (MERN / Node.js)
