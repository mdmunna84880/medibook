# Frontend Documentation

A modern, responsive healthcare patient portal built with **React 19**, **Redux Toolkit**, **Tailwind CSS v4**, and **Vite**.

> **Author:** Md Munna  
> **Purpose:** Learning & Assignment - Module 5, AlmaBetter Full Stack Web Development Training Program

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Routing](#routing)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Components](#components)
- [Pages](#pages)
- [Layouts](#layouts)
- [Styling](#styling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Utilities](#utilities)
- [Author](#author)

---

## Features

- 🔐 User authentication (Email/Password + Google OAuth via Firebase)
- 📊 Patient dashboard with profile management
- 📅 Appointment booking with file upload support
- 📋 Appointment history with year-based filtering
- 🏥 Service catalog browsing
- 🔄 Real-time state management with Redux Toolkit
- 🎨 Responsive design with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🔔 Toast notifications for user feedback
- ✅ Form validation with custom utilities
- 🧪 Unit testing with Vitest + React Testing Library
- 🚀 Fast development with Vite (HMR)

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | ^19.2.0 |
| **Build Tool** | Vite | ^7.2.4 |
| **State Management** | Redux Toolkit + React Redux | ^2.11.2 / ^9.2.0 |
| **Routing** | React Router | ^7.13.0 |
| **Styling** | Tailwind CSS | ^4.1.18 |
| **Animations** | Framer Motion | ^12.34.0 |
| **HTTP Client** | Axios | ^1.13.4 |
| **Authentication** | Firebase (Google OAuth) | ^12.9.0 |
| **Notifications** | React Toastify | ^11.0.5 |
| **Icons** | React Icons | ^5.5.0 |
| **Dropdowns** | React Select | ^5.10.2 |
| **Tooltips** | React Tooltip | ^5.30.0 |
| **Class Merging** | clsx + tailwind-merge | ^2.1.1 / ^3.4.0 |
| **Testing** | Vitest + React Testing Library | ^4.0.18 / ^16.3.2 |
| **Linting** | ESLint | ^9.39.1 |

---

## Project Structure

```
frontend/
├── src/
│   ├── main.jsx                    # App entry point (ReactDOM createRoot)
│   ├── App.jsx                     # Root component (Redux dispatch, ToastContainer)
│   ├── App.css                     # App-level styles
│   ├── index.css                   # Global styles + Tailwind imports
│   ├── NotFound.jsx                # 404 page component
│   ├── App.test.jsx                # Root app tests
│   │
│   ├── routes/
│   │   └── index.jsx               # All route definitions
│   │
│   ├── layouts/
│   │   ├── MainLayout/             # Authenticated layout (Header + Sidebar + Footer)
│   │   │   └── index.jsx
│   │   └── AuthLayout/             # Authentication pages layout
│   │       └── index.jsx
│   │
│   ├── pages/
│   │   ├── dashboard/              # Patient profile dashboard
│   │   │   ├── index.jsx
│   │   │   ├── utils.js            # Dashboard-specific utilities
│   │   │   └── index.test.jsx
│   │   ├── book-appointment/       # Appointment booking form
│   │   │   ├── index.jsx
│   │   │   ├── utils.js            # Booking form utilities
│   │   │   └── index.test.jsx
│   │   ├── my-appointment/         # Appointment history
│   │   │   ├── index.jsx
│   │   │   └── index.test.jsx
│   │   ├── services/               # Services catalog
│   │   │   ├── index.jsx
│   │   │   └── index.test.jsx
│   │   ├── login/                  # Login page
│   │   │   ├── index.jsx
│   │   │   └── index.test.jsx
│   │   └── signup/                 # Registration page
│   │       ├── index.jsx
│   │       └── index.test.jsx
│   │
│   ├── components/
│   │   ├── common/                 # Shared/reusable components
│   │   │   ├── Header/             # Top navigation bar
│   │   │   │   ├── index.jsx
│   │   │   │   └── index.test.jsx
│   │   │   ├── Footer/             # Site footer
│   │   │   │   └── index.jsx
│   │   │   ├── SideBar/            # Collapsible sidebar
│   │   │   │   ├── index.jsx
│   │   │   │   └── index.test.jsx
│   │   │   ├── Logo/               # Brand logo component
│   │   │   │   └── index.jsx
│   │   │   ├── Loading/            # Loading spinner
│   │   │   │   └── index.jsx
│   │   │   ├── Error/              # Error display component
│   │   │   │   └── index.jsx
│   │   │   ├── GoogleAuth/         # Google OAuth button
│   │   │   │   └── index.jsx
│   │   │   ├── ProtectedRoute/     # Auth guard for protected pages
│   │   │   │   ├── index.jsx
│   │   │   │   └── index.test.jsx
│   │   │   └── PublicRoute/        # Redirect authenticated users
│   │   │       ├── index.jsx
│   │   │       └── index.test.jsx
│   │   └── ui/                     # UI primitives (design system)
│   │       ├── Input/              # Reusable input component
│   │       │   └── index.jsx
│   │       └── Container/          # Content wrapper
│   │           └── index.jsx
│   │
│   ├── store/                      # Redux Toolkit state slices
│   │   ├── index.js                # Store configuration
│   │   ├── auth/                   # Authentication state
│   │   │   ├── authSlice.js
│   │   │   └── authThunk.js
│   │   ├── user/                   # User profile state
│   │   │   ├── userSlice.js
│   │   │   └── userThunk.js
│   │   ├── doctor/                 # Doctor state
│   │   │   ├── doctorSlice.js
│   │   │   └── doctorThunk.js
│   │   ├── appointment/            # Appointment state
│   │   │   ├── appointmentSlice.js
│   │   │   └── appointmentThunk.js
│   │   └── service/                # Service state
│   │       ├── serviceSlice.js
│   │       └── serviceThunk.js
│   │
│   ├── config/
│   │   ├── api.js                  # Axios instance configuration
│   │   └── firebase.js             # Firebase initialization
│   │
│   ├── utils/
│   │   ├── cn.js                   # Tailwind class merger utility
│   │   ├── cn.test.js
│   │   ├── validation.js           # Form validation utilities
│   │   └── validation.test.js
│   │
│   ├── test/
│   │   └── setup.js                # Test setup file
│   │
│   └── assets/                     # Static assets (images, icons, fonts)
│
├── public/                         # Public static files
├── dist/                           # Production build output
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── jsconfig.json                   # JavaScript project config (path aliases)
├── eslint.config.js                # ESLint configuration
├── vercel.json                     # Vercel deployment config
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- Backend API server running (see backend README)
- Firebase project configured (for Google OAuth)

---

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

---

## Environment Variables

Create a `.env` file in the `frontend/` root directory with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SERVER_URL` | Backend API server URL | **Yes** |
| `VITE_FIREBASE_API_KEY` | Firebase API key | **Yes** |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | **Yes** |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | **Yes** |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | **Yes** |
| `VITE_FIREBASE_MSG_SENDER_ID` | Firebase message sender ID | **Yes** |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | **Yes** |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | **Yes** |

**Example `.env` file:**
```env
VITE_SERVER_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MSG_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

> ⚠️ **Never commit `.env` files to version control.** All Firebase credentials should be kept secure.

---

## Running the Application

**Development mode** (with hot module replacement):
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

**Preview production build:**
```bash
npm run build
npm run preview
```

**Run tests:**
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once (no watch mode)
npm run test:run

# Run tests with watch mode
npm run test:watch
```

**Lint code:**
```bash
npm run lint
```

---

## Routing

The application uses **React Router v7** with a nested route structure. All routes are defined in `src/routes/index.jsx`.

### Route Structure

| Path | Layout | Auth Required | Component | Description |
|------|--------|---------------|-----------|-------------|
| `/` | MainLayout | ✅ Yes | Dashboard | Patient profile dashboard |
| `/book-appointment` | MainLayout | ✅ Yes | BookAppointment | Appointment booking form |
| `/my-appointment` | MainLayout | ✅ Yes | MyAppointment | Appointment history |
| `/services` | MainLayout | ✅ Yes | Services | Service catalog |
| `/auth/login` | AuthLayout | ❌ No | Login | User login page |
| `/auth/signup` | AuthLayout | ❌ No | SignUp | User registration page |
| `*` | - | - | NotFound | 404 error page |

### Route Guards

**ProtectedRoute:**
- Wraps authenticated-only routes
- Redirects to `/auth/login` if not authenticated
- Preserves redirect state for post-login navigation
- Shows loading spinner while checking auth status

**PublicRoute:**
- Wraps public auth pages (login/signup)
- Redirects authenticated users to home page
- Prevents logged-in users from accessing auth pages

---

## State Management

The application uses **Redux Toolkit (RTK)** with **React Redux** for global state management. The store is configured with 5 slices:

### Store Structure

```javascript
{
  auth: {        // Authentication state
    user: null,
    message: null,
    error: null,
    loading: true,
    isAuthenticated: false
  },
  user: {        // User profile data
    details: null,
    loading: false,
    error: null,
    message: null
  },
  service: {     // Services catalog
    services: [],
    loading: false,
    error: null
  },
  doctor: {      // Doctor data
    departments: [],
    loading: false,
    error: null
  },
  appointment: { // Appointments
    appointments: [],
    years: [],
    loading: false,
    error: null,
    message: null
  }
}
```

### Redux Slices

#### Auth Slice (`store/auth/`)
- **Actions:** `clearAuthMsgErr`
- **Thunks:** `signup`, `login`, `logout`, `googleAuth`, `getMe`
- **Purpose:** Manages user authentication state, login/signup flows, and session persistence

#### User Slice (`store/user/`)
- **Thunks:** `getPatientDetail`, `updateProfile`
- **Purpose:** Manages patient profile data (phone, address)

#### Doctor Slice (`store/doctor/`)
- **Thunks:** `getAllDepartments`
- **Purpose:** Fetches and stores doctor department data

#### Appointment Slice (`store/appointment/`)
- **Thunks:** `bookAppointment`, `getUserAllAppointment`, `getDistinctYear`
- **Purpose:** Manages appointment booking, history, and year filtering

#### Service Slice (`store/service/`)
- **Thunks:** `getAllServices`
- **Purpose:** Fetches and stores service catalog data

### State Flow

```
User Action → Dispatch Thunk → API Call → Async Thunk Lifecycle
                                    ↓
                    pending → loading: true
                    fulfilled → update state, loading: false
                    rejected → set error, loading: false
                                    ↓
                          Component Re-renders
```

---

## API Integration

### Axios Configuration

All API calls go through a centralized Axios instance configured in `src/config/api.js`:

```javascript
const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true  // Sends cookies with requests
});
```

**Key Features:**
- **Base URL** from environment variable (`VITE_SERVER_URL`)
- **Credentials enabled** for HTTP-only cookie authentication
- **Reusable instance** across all thunks

### API Endpoints Used

| Endpoint | Method | Thunk Location | Purpose |
|----------|--------|----------------|---------|
| `/api/auth/register` | POST | auth/authThunk | User registration |
| `/api/auth/login` | POST | auth/authThunk | User login |
| `/api/auth/logout` | POST | auth/authThunk | User logout |
| `/api/auth/google` | POST | auth/authThunk | Google OAuth |
| `/api/auth/me` | GET | auth/authThunk | Get current user |
| `/api/users/` | GET | user/userThunk | Get patient details |
| `/api/users/edit` | PATCH | user/userThunk | Update profile |
| `/api/doctors/department` | GET | doctor/doctorThunk | Get departments |
| `/api/appointments/add` | POST | appointment/appointmentThunk | Book appointment |
| `/api/appointments/` | GET | appointment/appointmentThunk | Get appointments |
| `/api/appointments/years` | GET | appointment/appointmentThunk | Get appointment years |
| `/api/services/` | GET | service/serviceThunk | Get all services |

---

## Authentication Flow

### Email/Password Authentication

1. User fills out login/signup form
2. Form validation runs on submit
3. `login` or `signup` thunk dispatches to `/api/auth/*`
4. Backend sets HTTP-only cookie with JWT
5. Auth slice updates state (`isAuthenticated: true`, `user` data)
6. User redirected to dashboard

### Google OAuth Authentication

1. User clicks "Sign in with Google" button
2. Firebase SDK handles Google OAuth popup
3. On success, Firebase returns user data (googleId, name, email, avatar)
4. `googleAuth` thunk sends data to backend `/api/auth/google`
5. Backend creates/updates user, sets JWT cookie
6. Auth slice updates state
7. User redirected to dashboard

### Session Persistence

- On app load, `App.jsx` dispatches `getMe()` thunk
- If JWT cookie is valid, backend returns user data
- Auth state set to authenticated
- If invalid, user redirected to login

### Protected Routes

```javascript
<ProtectedRoute>
  <MainLayout />
</ProtectedRoute>
```

- Checks `isAuthenticated` from Redux
- Shows loading spinner while verifying
- Redirects to `/auth/login` if not authenticated
- Preserves redirect state for return navigation

---

## Components

### Common Components

#### Header (`components/common/Header/`)
- Top navigation bar
- Displays logo, user info, navigation links
- Triggers sidebar toggle on mobile
- Shows logout button

#### Footer (`components/common/Footer/`)
- Site footer with branding
- Static content

#### SideBar (`components/common/SideBar/`)
- Collapsible sidebar with navigation
- Animated with Framer Motion
- Shows links to Dashboard, Book Appointment, My Appointments, Services
- Mobile-friendly

#### Logo (`components/common/Logo/`)
- Brand logo component
- Used in header and auth pages

#### Loading (`components/common/ Loading/`)
- Loading spinner component
- Shows during async operations

#### Error (`components/common/Error/`)
- Error display component
- Shows error messages with styling

#### GoogleAuth (`components/common/GoogleAuth/`)
- Google Sign-In button
- Integrates with Firebase SDK
- Handles OAuth popup flow

#### ProtectedRoute (`components/common/ProtectedRoute/`)
- Route guard for authenticated routes
- Redirects unauthenticated users
- Shows loading state

#### PublicRoute (`components/common/PublicRoute/`)
- Route guard for public auth routes
- Redirects authenticated users away from login/signup

### UI Components

#### Input (`components/ui/Input/`)
- Reusable form input
- Supports labels, placeholders, errors
- Customizable via `cn` utility
- Supports disabled/readonly states

#### Container (`components/ui/Container/`)
- Content wrapper component
- Applies max-width and centering

---

## Pages

### Dashboard (`pages/dashboard/`)
- Patient profile management
- Shows name, email (read-only)
- Editable phone and address fields
- Form validation on blur
- Save/Discard changes
- Real-time validation feedback

### Book Appointment (`pages/book-appointment/`)
- Appointment booking form
- Department selection (react-select dropdown)
- Date/time picker (future dates only)
- Optional report file upload
- Comments textarea
- Validation on blur
- Redirects to My Appointments on success

### My Appointments (`pages/my-appointment/`)
- Appointment history list
- Year-based filtering
- Shows doctor details, status, date
- View uploaded reports
- Empty state handling

### Services (`pages/services/`)
- Service catalog grid
- Displays service name, description, icon
- Responsive card layout

### Login (`pages/login/`)
- Email/password login form
- Google OAuth button
- Form validation
- Link to signup page
- Redirects to dashboard on success

### Signup (`pages/signup/`)
- User registration form
- Name, email, password fields
- Password strength validation
- Google OAuth button
- Link to login page

---

## Layouts

### MainLayout (`layouts/MainLayout/`)
- Layout for authenticated pages
- Includes:
  - Header (fixed top)
  - Sidebar (collapsible, animated)
  - Main content area (`<Outlet />`)
  - Footer (fixed bottom)
- Manages sidebar open/close state
- Responsive design

### AuthLayout (`layouts/AuthLayout/`)
- Layout for auth pages (login/signup)
- Centered content on full-height background
- Minimal design to focus on forms

---

## Styling

### Tailwind CSS v4

The application uses **Tailwind CSS v4** with the Vite plugin for utility-first styling.

**Configuration:**
- Tailwind is imported via `@tailwindcss/vite` plugin
- No `tailwind.config.js` needed (v4 uses CSS-first configuration)

**Color Palette:**
- Background: `#d4d8f0` (light blue-gray)
- Cards: `#fffffe` (off-white)
- Borders: `#121629` (dark navy)
- Text: `#232946` (dark blue-gray)
- Buttons: `#b8c1ec` (lavender)
- Errors: `text-red-400`

### Class Merger Utility

```javascript
// src/utils/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Used throughout the app to conditionally merge Tailwind classes without conflicts.

### Animations

**Framer Motion** is used for:
- Sidebar open/close animations (`AnimatePresence`)
- Smooth transitions between states

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Flexible layouts with `flex` and `grid`
- Responsive padding/margins (`px-4 md:px-6`)

---

## Testing

The project uses **Vitest** with **React Testing Library** for unit and integration testing.

### Test Setup

**Configuration** (`vite.config.js`):
```javascript
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./src/test/setup.js",
}
```

**Test Files:**
- Each page/component has a corresponding `.test.jsx` file
- Utilities have `.test.js` files

### Running Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run once (CI mode)
npm run test:run

# Watch mode
npm run test:watch
```

### Tested Components

- Header
- ProtectedRoute
- PublicRoute
- SideBar
- Dashboard
- BookAppointment
- MyAppointment
- Services
- Login
- Signup
- Validation utilities
- cn utility

---

## Deployment

### Vercel

The app is configured for deployment on **Vercel**:

**vercel.json:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This ensures client-side routing works correctly on Vercel.

**Deploy Steps:**
1. Build the app: `npm run build`
2. Deploy the `dist/` folder to Vercel
3. Set environment variables in Vercel dashboard

### Build Output

```bash
npm run build
```

Output is generated in the `dist/` directory, optimized for production with:
- Minified CSS/JS
- Code splitting
- Asset hashing

---

## Utilities

### Validation (`src/utils/validation.js`)

Reusable form validation utilities:

| Function | Purpose |
|----------|---------|
| `validatePassword(password)` | Validates password strength (length, uppercase, lowercase, digits, special chars) |
| `validateEmail(email)` | Validates email format (structure, @ symbol, no spaces) |
| `validateName(name)` | Validates name (min length, only letters/spaces) |
| `validatePhone(phone)` | Validates phone number (country code, digit length, format) |

Each returns:
```javascript
{
  isValid: boolean,
  errors: string[],
  message: string
}
```

### Class Name Merger (`src/utils/cn.js`)

Merges Tailwind classes intelligently to avoid conflicts:

```javascript
cn("bg-red-500", "bg-blue-500") // → "bg-blue-500"
cn("p-4", condition && "p-8")   // → Conditional merging
```

---

## Development Conventions

### Code Style

- **ESLint** for linting (configured in `eslint.config.js`)
- React Hooks and Refresh plugins enabled
- Strict mode enabled in `main.jsx`

### Path Aliases

Configured in `jsconfig.json` and `vite.config.js`:

```javascript
"@/*" → "src/*"
```

Usage:
```javascript
import Container from "@/components/ui/Container";
```

### Component Structure

- Each component in its own folder
- `index.jsx` for the component
- `index.test.jsx` for tests
- `utils.js` for component-specific utilities (if needed)

### Redux Thunk Pattern

All async logic follows RTK thunk pattern:

```javascript
export const myThunk = createAsyncThunk(
  "slice/action",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/endpoint", payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
```

---

## Known Limitations

1. **No Role-Based Access Control:** All authenticated users have the same permissions
2. **Firebase Config in Frontend:** Firebase API keys are exposed in frontend (acceptable for Firebase, but should be restricted via Firebase Console rules)
3. **No Appointment Editing:** Users can only book and view appointments, not edit/cancel
4. **No Real-Time Updates:** Appointment status updates require page refresh
5. **Limited Error Boundaries:** No React Error Boundaries implemented yet

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
AlmaBetter Student  

> **Purpose:** Learning & Assignment - Module 5, AlmaBetter Full Stack Web Development Training Program
