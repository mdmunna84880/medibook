const express = require('express');
const router = express.Router();

const {isLogin} = require('../middlewares/auth');
const { bookAppointment, getUserAllAppointment, getDistinctYear } = require('../controllers/appointment');

router.post('/add', isLogin, bookAppointment);
router.get('/', isLogin, getUserAllAppointment);
router.get('/years', isLogin, getDistinctYear);

module.exports = router;