const express = require('express');
const { isLogin } = require('../middlewares/auth');
const { getPatientDetails, editPatientInfo, updateAvatar } = require('../controllers/user');
const { uploadAvatar } = require("../middlewares/upload");
const { validate } = require("../middlewares/validate");
const { userSchema } = require("../validators/userSchema");
const { noCache } = require('../middlewares/noCache');
const router = express.Router();

// Get patient details
router.get('/', isLogin, noCache, getPatientDetails);

// Edit patient detail
router.patch('/edit', isLogin,validate(userSchema), editPatientInfo);

// Change profile image
router.patch("/avatar", isLogin, uploadAvatar, updateAvatar);

module.exports = router;