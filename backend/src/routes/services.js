const express = require('express');
const { addService, getAllServices } = require('../controllers/service');
const { isLogin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', isLogin, getAllServices);
router.post('/add', isLogin, addService);

module.exports = router;