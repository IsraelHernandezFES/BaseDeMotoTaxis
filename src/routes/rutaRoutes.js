const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const authorize = require('../middlewares/authMiddleware');

router.get('/', authorize(['admin', 'operator']), rutaController.getAllRoutes);
router.post('/', authorize('admin'), rutaController.createRoute);
router.put('/:id', authorize('admin'), rutaController.updateRoute);
router.delete('/:id', authorize('admin'), rutaController.deleteRoute);

module.exports = router;