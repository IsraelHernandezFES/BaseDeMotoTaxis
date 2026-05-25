const express = require('express');
const router = express.Router();
const motoTaxiController = require('../controllers/motoTaxiController');
const authorize = require('../middlewares/authMiddleware');

// Operaciones del Administrador aseguradas con token
router.get('/', authorize(['admin', 'operator']), motoTaxiController.getAllUnits);
router.post('/', authorize('admin'), motoTaxiController.createUnit);
router.put('/:id', authorize('admin'), motoTaxiController.updateUnit);
router.delete('/:id', authorize('admin'), motoTaxiController.deleteUnit);

module.exports = router;