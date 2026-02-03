require('dotenv').config();

// All environment variable will be exported from here only.
const env = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = env;