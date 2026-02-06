const express = require('express');
const { isLogin } = require('../middlewares/auth');
const { addDoctor, getAllDepartment } = require('../controllers/doctor');
const router = express.Router();

// Add doctor
router.post('/add',isLogin, addDoctor);

// Get all the department of the doctor
router.get('/department', isLogin, getAllDepartment);

module.exports = router;