const express = require('express');
const router = express.Router();

const {isLogin} = require('../middlewares/auth');
const {appointmentSchema} = require('../validators/appointmentSchema');
const { bookAppointment, getUserAllAppointment, getDistinctYear } = require('../controllers/appointment');
const { uploadReport } = require("../middlewares/upload");
const { validate } = require('../middlewares/validate');

// Appointment detail form
router.post('/add', isLogin,validate(appointmentSchema), uploadReport, bookAppointment);

// Get all appointment for specific user
router.get('/', isLogin, getUserAllAppointment);

// Get all years in which they have booked
router.get('/years', isLogin, getDistinctYear);

module.exports = router;