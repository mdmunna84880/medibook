const express = require('express');
const { addService, getAllServices } = require('../controllers/service');
const { isLogin } = require('../middlewares/auth');
const { uploadServiceIcon } = require("../middlewares/upload");
const { validate } = require("../middlewares/validate");
const { serviceSchema } = require("../validators/serviceSchema");
const { noCache } = require('../middlewares/noCache');
const router = express.Router();

// Get all services to display
router.get('/', isLogin, noCache, getAllServices);

// Add services
router.post('/add', isLogin, validate(serviceSchema), uploadServiceIcon, addService);

module.exports = router;