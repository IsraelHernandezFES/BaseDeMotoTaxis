const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacoraController');
const authorize = require('../middlewares/authMiddleware');

router.get('/', authorize(['admin', 'operator']), bitacoraController.getLogs);
router.post('/', authorize(['admin', 'operator']), bitacoraController.createLog);

module.exports = router;