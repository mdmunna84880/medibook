# 🏥 MediBook – Doctor Appointment Booking Platform

![React](https://img.shields.io/badge/Frontend-React_19-blue?logo=react)
![Redux](https://img.shields.io/badge/State-Redux_Toolkit-purple?logo=redux)
![Node](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-green?logo=mongodb)
![Vercel](https://img.shields.io/badge/Frontend-Hosted_on_Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Hosted_on_Render-46E3B7)

A full-stack **Doctor Appointment Booking System** built using modern web technologies.
Designed as an academic capstone project with production-ready MVP architecture.

🔗 **Live Application:** [https://medibook-sigma.vercel.app/](https://medibook-sigma.vercel.app/)
📄 **API Documentation:** [https://documenter.getpostman.com/view/48458052/2sBXc8pj1c](https://documenter.getpostman.com/view/48458052/2sBXc8pj1c)

---

# 📌 Project Overview

MediBook allows patients to:

* 🔐 Register & authenticate securely (JWT + Google OAuth)
* 📅 Book doctor appointments
* 📄 Upload medical reports
* 👤 Manage personal profile
* 📋 View appointment history

This project demonstrates full-stack engineering principles with clean architecture and scalable structure.

---

# 🏗️ Monorepo Architecture

```bash
medibook/
│
├── frontend/   # React + Redux SPA
└── backend/    # Express + MongoDB (MVC)
```

---

# ⚛️ Tech Stack

## Frontend

* React 19
* Redux Toolkit + Thunks
* React Router
* Tailwind CSS
* Axios
* Framer-Motion
* Firebase (Google OAuth)
* Vitest + React Testing Library

## Backend

* Node.js
* Express (MVC Pattern)
* MongoDB Atlas
* Mongoose
* Joi Validation
* JWT (HTTP-only Cookies)
* bcrypt
* Multer
* Cloudinary
* Morgan

---

# 🔐 Authentication & Security

* JWT stored in **HTTP-only cookies**
* 7-day token validity
* bcrypt hashing (10 salt rounds)
* Google OAuth integration
* Joi-based request validation
* Indexed authentication fields
* Secure environment variable separation

---

# 🗄️ Database Design

## Collections

| Collection   | Description                        |
| ------------ | ---------------------------------- |
| users        | Patient accounts                   |
| doctors      | System-managed doctors             |
| services     | Healthcare services                |
| appointments | Booking records + embedded reports |

## Indexing

**User Collection**

* email (unique index)
* googleId

**Appointment Collection**

* userId
* doctorId

Optimized for authentication and appointment lookups.

---

# 📅 Appointment Rules

* Future-date validation enforced
* Single-patient booking only
* No cancellation or rescheduling (MVP scope)
* Year-based filtering available
* Reports embedded within appointment document

---

# 🧪 Testing

### Frontend

* Vitest
* React Testing Library
* Unit tests for:

  * Buttons
  * Inputs
  * Toasts
  * Protected Routes
  * Utilities

### Backend

* API tested via Postman
* Public documentation available

📄 API Docs:
[https://documenter.getpostman.com/view/48458052/2sBXc8pj1c](https://documenter.getpostman.com/view/48458052/2sBXc8pj1c)

---

# ⚙️ Environment & Deployment

| Layer        | Platform                           |
| ------------ | ---------------------------------- |
| Frontend     | Vercel                             |
| Backend      | Render                             |
| Database     | MongoDB Atlas (`medibook-cluster`) |
| File Storage | Cloudinary                         |

Environment variables are managed separately for frontend and backend deployments.

---

# 🚀 Running the Project Locally

Since this is a **monorepo**, install dependencies separately.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdmunna84880/medibook.git
cd medibook
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file inside `backend/`

Example:

```env
# Server
PORT=8080
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medibook

# Authentication
JWT_SECRET=your_strong_secret_key
JWT_EXPIRES_IN=7d
WEB_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Backend

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### Create `.env` file inside `frontend/`

Example:

```env
VITE_SERVER_URL=http://localhost:8080

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MSG_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Run Frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# ⚡ Performance Considerations

* Indexed database fields
* Referencing to reduce duplication
* Embedded report data for efficiency
* Memoization using `useMemo`
* Optimized callbacks using `useCallback`

---

# 🚀 Future Enhancements

* Appointment cancellation
* Rescheduling system
* Slot-based booking engine
* Role-based access (Admin/Doctor)
* Email notifications
* Payment integration
* Pagination
* Advanced search & filtering
* CI/CD pipeline
* Dockerization
* Real-time updates (WebSockets)

---

# 🎓 Project Scope

* Educational Demonstration Project
* Academic Capstone Submission
* Production-Ready MVP Architecture
* Portfolio-Level Full-Stack Application

---

# 👨‍💻 Author

**Md Munna**

Engineer | Full-Stack Developer

GitHub: [https://github.com/mdmunna84880](https://github.com/mdmunna84880)
