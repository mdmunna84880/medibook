const express = require('express');
const { isLogin } = require('../middlewares/auth');
const { addDoctor, getAllDepartment } = require('../controllers/doctor');
const router = express.Router();

router.post('/add',isLogin, addDoctor);
router.get('/department', isLogin, getAllDepartment);

module.exports = router;