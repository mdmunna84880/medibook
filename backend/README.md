# Backend API Documentation

A RESTful API for a healthcare/medical appointment booking system built with **Express.js v5** and **MongoDB** (Mongoose).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Doctors](#doctors)
  - [Appointments](#appointments)
  - [Services](#services)
- [Authentication & Authorization](#authentication--authorization)
- [Database Models](#database-models)
- [File Upload](#file-upload)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Known Issues](#known-issues)
- [Author](#author)

---

## Features

- 🔐 User registration and login (local + Google OAuth)
- 👤 User profile management with avatar upload
- 👨‍⚕️ Doctor management
- 📅 Appointment booking with optional report uploads
- 🏥 Service catalog management
- 🔒 JWT-based authentication with HTTP-only cookies
- ☁️ Cloudinary integration for image/file storage
- ✅ Request validation with Joi
- 📝 HTTP request logging (development)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5 |
| **Database** | MongoDB (via Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken) + bcrypt |
| **OAuth** | Google OAuth |
| **Validation** | Joi |
| **File Upload** | Multer |
| **Cloud Storage** | Cloudinary |
| **CORS** | cors |
| **Logging** | Morgan |

---

## Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app setup & middleware
│   ├── index.js               # Entry point (server initialization)
│   ├── config/
│   │   ├── env.js             # Environment variable exporter
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary SDK configuration
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Doctor.js          # Doctor schema
│   │   ├── Appointment.js     # Appointment schema
│   │   └── Service.js         # Service schema
│   ├── routes/
│   │   ├── auths.js           # /api/auth/* routes
│   │   ├── users.js           # /api/users/* routes
│   │   ├── doctors.js         # /api/doctors/* routes
│   │   ├── appointments.js    # /api/appointments/* routes
│   │   └── services.js        # /api/services/* routes
│   ├── controllers/
│   │   ├── auth.js            # Auth logic (register, login, logout, etc.)
│   │   ├── user.js            # User profile logic
│   │   ├── doctor.js          # Doctor management logic
│   │   ├── appointment.js     # Appointment booking logic
│   │   └── service.js         # Service catalog logic
│   ├── middlewares/
│   │   ├── auth.js            # JWT verification (isLogin)
│   │   ├── noCache.js         # Cache-control headers
│   │   ├── upload.js          # Multer file upload configs
│   │   └── validate.js        # Joi validation wrapper
│   ├── validators/
│   │   ├── userSchema.js      # User registration/login validation
│   │   ├── appointmentSchema.js # Appointment booking validation
│   │   ├── doctorSchema.js    # Doctor creation validation (unused)
│   │   └── serviceSchema.js   # Service creation validation
│   └── utils/
│       ├── jwt.js             # Token generation
│       ├── cookie.js          # Cookie helpers
│       └── cloudUpload.js     # Cloudinary upload helper
├── uploads/tmp/               # Temporary file storage (runtime)
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (local or cloud-hosted like MongoDB Atlas)
- **Cloudinary account** (for image/file storage)
- **Google OAuth credentials** (optional, for Google login)

---

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

---

## Environment Variables

Create a `.env` file in the `backend/` root directory with the following variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `8080` |
| `MONGO_URI` | MongoDB connection string | **Yes** | - |
| `NODE_ENV` | Environment mode (`development`/`production`) | No | `development` |
| `JWT_SECRET` | Secret key for JWT signing | **Yes** | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | **Yes** | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | **Yes** | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | **Yes** | - |

**Example `.env` file:**
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/healthcare-db
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

> ⚠️ **Never commit `.env` files to version control.** The `.gitignore` file should exclude it.

---

## Running the Server

**Development mode** (with logging):
```bash
npm run dev
```
*Or if no dev script is defined:*
```bash
node src/index.js
```

**Production mode:**
```bash
NODE_ENV=production node src/index.js
```

The server will start on `http://localhost:<PORT>` (default: `8080`).

---

## API Endpoints

**Base URL:** `http://localhost:8080`

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Check if server is running |

**Response:**
```json
{ "msg": "Application is running successfully." }
```

---

### Authentication

**Base:** `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login with email/password |
| POST | `/api/auth/logout` | Yes | Logout (clear auth cookie) |
| POST | `/api/auth/google` | No | Login/register via Google OAuth |
| GET | `/api/auth/me` | Yes | Get current user info |

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Google OAuth
```http
POST /api/auth/google
Content-Type: application/json

{
  "googleId": "google-oauth-id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://..."
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=<jwt-token>
```

---

### Users

**Base:** `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/` | Yes | Get authenticated user details |
| PATCH | `/api/users/edit` | Yes | Update user profile |
| PATCH | `/api/users/avatar` | Yes | Upload profile avatar |

#### Get User Details
```http
GET /api/users/
Cookie: token=<jwt-token>
```

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "phone": "1234567890",
  "email": "john@example.com",
  "address": { ... }
}
```

#### Update Profile
```http
PATCH /api/users/edit
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "phone": "1234567890",
  "address": {
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "nationality": "US",
    "zipCode": "10001"
  }
}
```

#### Upload Avatar
```http
PATCH /api/users/avatar
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

avatar: <file>
```

---

### Doctors

**Base:** `/api/doctors`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/doctors/add` | Yes | Add a new doctor |
| GET | `/api/doctors/department` | Yes | Get all departments |

#### Add Doctor
```http
POST /api/doctors/add
Content-Type: application/json
Cookie: token=<jwt-token>

{
  "name": "Dr. Jane Smith",
  "department": "Cardiology",
  "specialization": "Heart Surgery",
  "experience": 15,
  "rating": 4.8
}
```

#### Get Departments
```http
GET /api/doctors/department
Cookie: token=<jwt-token>
```

**Response:**
```json
[
  { "department": "Cardiology" },
  { "department": "Neurology" },
  { "department": "Pediatrics" }
]
```

---

### Appointments

**Base:** `/api/appointments`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/appointments/add` | Yes | Book an appointment |
| GET | `/api/appointments/` | Yes | Get user's appointments |
| GET | `/api/appointments/years` | Yes | Get years with appointments |

#### Book Appointment
```http
POST /api/appointments/add
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

doctorId: <doctor-id>
appointmentAt: 2025-05-15T10:00:00.000Z
comments: "First consultation"
status: "booked"
report: <file> (optional)
```

#### Get All Appointments
```http
GET /api/appointments/?year=2025
Cookie: token=<jwt-token>
```

**Query Parameters:**
- `year` (optional): Filter appointments by year

**Response:**
```json
[
  {
    "_id": "...",
    "userId": { ... },
    "doctorId": { ... },
    "appointmentAt": "2025-05-15T10:00:00.000Z",
    "comments": "First consultation",
    "report": { ... },
    "status": "booked",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Get Appointment Years
```http
GET /api/appointments/years
Cookie: token=<jwt-token>
```

**Response:**
```json
[2024, 2025]
```

---

### Services

**Base:** `/api/services`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services/` | Yes | Get all services |
| POST | `/api/services/add` | Yes | Add a new service |

#### Get All Services
```http
GET /api/services/
Cookie: token=<jwt-token>
```

#### Add Service
```http
POST /api/services/add
Content-Type: multipart/form-data
Cookie: token=<jwt-token>

name: "General Consultation"
description: "Basic health checkup"
icon: <file>
```

---

## Authentication & Authorization

### Mechanism

- **JWT (JSON Web Tokens)** stored in **HTTP-only cookies** (not accessible via client-side JavaScript)
- Tokens expire after **7 days**
- Cookie configuration:
  - `httpOnly: true`
  - `secure: true` in production, `false` in development
  - `sameSite: "none"` in production, `"lax"` in development
  - `path: "/"`

### Authentication Flow

1. User registers/logs in → server generates JWT → sets cookie
2. Subsequent requests automatically include cookie
3. `isLogin` middleware verifies JWT and attaches `req.user`
4. Protected routes require valid JWT

### Supported Auth Providers

- **Local:** Email/password with bcrypt hashing (10 salt rounds)
- **Google:** OAuth via Google ID

---

## Database Models

### User

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | |
| `email` | String | Required, unique, lowercase, indexed |
| `password` | String | `select: false` (hidden by default) |
| `authProvider` | String | Enum: `"local"`, `"google"` (default: `"local"`) |
| `googleId` | String | Indexed |
| `phone` | String | |
| `avatar` | String | URL |
| `address` | Object | Nested: `addressLine1`, `addressLine2`, `city`, `state`, `nationality`, `zipCode` |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Doctor

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `specialization` | String | Required |
| `department` | String | Required |
| `experience` | Number | Required |
| `rating` | Number | Min: 0, Max: 5 |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Appointment

| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId | **Ref: User** (required) |
| `doctorId` | ObjectId | **Ref: Doctor** (required) |
| `appointmentAt` | Date | Required |
| `comments` | String | |
| `report` | Object | Nested: `fileUrl`, `fileType`, `uploadedAt` |
| `status` | String | Enum: `"booked"`, `"pending"` (default: `"booked"`) |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Service

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `description` | String | Required |
| `icon` | String | Required (Cloudinary URL) |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Relationships

```
Appointment ──► User (userId)
Appointment ──► Doctor (doctorId)
```

---

## File Upload

### Supported Uploads

| Endpoint | Field Name | Processing |
|----------|-----------|------------|
| `PATCH /api/users/avatar` | `avatar` | Face-crop 200x200 via Cloudinary |
| `POST /api/services/add` | `icon` | Direct upload to Cloudinary |
| `POST /api/appointments/add` | `report` | Upload to Cloudinary (optional) |

### Upload Flow

1. File uploaded via **Multer** → saved to `uploads/tmp/`
2. Uploaded to **Cloudinary** via `cloudUpload.js` utility
3. Temporary file deleted (even on error)
4. Cloudinary URL saved to database

### Configuration

Cloudinary transformations can be applied during upload (e.g., face-cropping for avatars).

---

## Middleware

### Global Middleware

| Middleware | Purpose |
|------------|---------|
| `trust proxy` | Set to `1` for proper IP detection |
| `cors` | Origin: `true`, credentials: `true` |
| `express.json()` | Parse JSON request bodies |
| `cookieParser()` | Parse cookies from requests |
| `morgan('dev')` | HTTP request logging (development only) |

### Route-Level Middleware

| Middleware | Purpose |
|------------|---------|
| `isLogin` | Verify JWT authentication |
| `validate(schema)` | Validate request body with Joi |
| `uploadAvatar` / `uploadServiceIcon` / `uploadReport` | Handle file uploads via Multer |
| `noCache` | Disable browser caching for sensitive routes |

### noCache Applied To

- `GET /api/auth/me`
- `GET /api/users/`
- `GET /api/appointments/`
- `GET /api/appointments/years`
- `GET /api/doctors/department`
- `GET /api/services/`

---

## Error Handling

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (invalid/missing token) |
| `404` | Not found |
| `500` | Internal server error |

### Validation Errors

Invalid requests return Joi validation errors with details on what failed.

### Authentication Errors

Missing or invalid JWT tokens return `401 Unauthorized`.

---

## Known Issues

1. **Missing Doctor Validation:** The `doctorSchema.js` validator exists but is **not applied** to the `POST /api/doctors/add` route. Doctor creation currently has no request body validation.

2. **No Role-Based Access Control:** All authenticated users can access all routes, including `POST /api/doctors/add` and `POST /api/services/add`. Consider implementing admin/doctor/patient roles.

3. **DNS Hardcoding:** The entry point (`index.js`) hardcodes Google DNS servers (`8.8.8.8`, `8.8.4.4`) to prevent MongoDB connection issues. This may cause problems in certain network environments.

4. **No Appointment Date Past-Check:** While `appointmentAt` is validated to be in the future via Joi, there's no server-side check preventing users from viewing/editing past appointments differently.

---

## License

This project is created for educational purposes as part of the AlmaBetter Full Stack Web Development Training Program (Module 5 Assignment).

---

## Support

For issues or questions, please contact the development team.

---

## Author

**Md Munna**  
Full Stack Developer 
AlmaBetter Trainee 

> **Purpose:** Learning & Assignment - Module 5, AlmaBetter Full Stack Web Development Training Program
