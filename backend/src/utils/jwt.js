const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// Generate token to send
const generateToken = (payload)=>{
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

module.exports = {generateToken};