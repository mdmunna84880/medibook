const express = require('express');
const { register, login, logout, getMe, googleAuth } = require('../controllers/auth');
const { isLogin } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const {userSchema} = require('../validators/userSchema')
const router = express.Router();

// Register route
router.post("/register", validate(userSchema), register);

// Login Route
router.post("/login", validate(userSchema), login)

// Logout route
router.post("/logout", isLogin, logout)

// Google authentication route
router.post("/google", validate(userSchema), googleAuth);

// login automatically via JWT
router.get("/me", isLogin, getMe)

module.exports = router;