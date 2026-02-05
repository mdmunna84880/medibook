const express = require('express');
const { isLogin } = require('../middlewares/auth');
const { getPatientDetails, editPatientInfo } = require('../controllers/user');
const router = express.Router();

router.get('/', isLogin, getPatientDetails);
router.patch('/edit', isLogin, editPatientInfo);

module.exports = router;