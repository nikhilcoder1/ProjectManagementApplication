
# 🧠 Project Title: Complete Backend for Project Management App

## 🚀 Overview
This repository contains a **fully functional backend API** built using **Node.js**, **Express.js**, and **MongoDB**.  
It provides all essential functionalities for a project management system — including authentication, project creation, task handling, and team collaboration features.

---

## 🏗️ Features

- **User Authentication** — Register, Login, Logout with JWT  
- **Project Management** — Create, update, delete projects  
- **Task & Subtask Handling** — CRUD operations  
- **Notes System** — Add notes to projects/tasks  
- **Role-Based Access** — Secured routes  
- **File Upload Support** — Multer-based  
- **API Error Handling** — Centralized  
- **Health Check Endpoint** — Verify server status  
- **Modular Architecture** — Scalable folder structure  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Validation | Custom Validator Middleware |
| File Upload | Multer |
| Utilities | Nodemailer, Async Handler, Custom API Response |

---

## 📁 Folder Structure

```
src/
│
├── controllers/       # Route controller logic
├── middlewares/       # Auth, multer, validator
├── models/            # Mongoose schemas
├── routes/            # API routes
├── utils/             # Helper utilities
├── validators/        # Input validators
├── db/                # DB connection
├── app.js             # Express app setup
└── index.js           # Entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/nikhilcoder1/ProjectManagementApplication.git
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup `.env` file
```
PORT=3000
MONGODB_URI=your_mongo_url
JWT_SECRET=your_secret
```

### 4️⃣ Run the server
```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |
| POST | /auth/logout | Logout |
| GET  | /healthcheck | Check server status |
| POST | /projects | Create project |
| GET  | /projects/:id | Get project |
| POST | /tasks | Create task |
| PATCH | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## 🛠️ Tools Used

- Postman  
- MongoDB Compass  
- Nodemon  

---

## 👨‍💻 Author

**Nikhil Pandey**  
Full Stack Developer — MERN  
[GitHub](https://github.com/nikhilcoder1) • [LinkedIn](#)
