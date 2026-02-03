const express = require('express');
const morgan = require('morgan');
const env = require('./config/env');
const cors = require('cors');

// Initializing application
const app = express();

app.use(cors());

// Logger in Development phase
if(env.NODE_ENV !== "production"){
    app.use(morgan('dev'));
}

// Home route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "Application is running successfully."});
})

app.post("/api/auth/register", async (req, res)=>{

})


module.exports = app;