const express = require('express');
const { register, login, logout, getMe, googleAuth } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');
const router = express.Router();

// Register route
router.post("/register", register);

// Login Route
router.post("/login", login)

// Logout route
router.post("/logout", logout)

// Google authentication route
router.post("/google", googleAuth);

// login automatically via JWT
router.get("/me", isLogin, getMe)

module.exports = router;