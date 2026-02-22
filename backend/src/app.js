const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auths');
const userRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const serviceRoutes = require('./routes/services');
const env = require('./config/env');

// Initializing application
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://medibook-one-mu.vercel.app"
];

// Middlewares like cors, cookieParser and more
app.use(cors({origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    }, credentials: true}));

app.use(express.json());
app.use(cookieParser());

// Logger in Development phase
if(env.NODE_ENV !== "production"){
    app.use(morgan('dev'));
}

// Home route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "Application is running successfully."});
})

// Middlewares for routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);

module.exports = app;