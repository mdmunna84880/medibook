const express = require('express');
const morgan = require('morgan');
const env = require('./config/env');
const cors = require('cors');
const authRoutes = require('./routes/auths');
const cookieParser = require("cookie-parser");

// Initializing application
const app = express();

app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser())

// Logger in Development phase
if(env.NODE_ENV !== "production"){
    app.use(morgan('dev'));
}

// Home route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "Application is running successfully."});
})

app.use('/api/auth', authRoutes);

module.exports = app;