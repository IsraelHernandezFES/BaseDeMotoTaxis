const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

//ruta protegida solo disponible si mandas un tocken admin
router.get('/panel', authorize('admin'), (req, res) => {
    res.json({ msg: `Bienvenido al panel de control de MotoTaxis, Administrador con ID: ${req.user.id}` });
});
// NUEVAS RUTAS PARA OPERADORES
router.get('/operators', authorize('admin'), adminController.getOperators);
router.put('/operators/:id', authorize('admin'), adminController.updateOperator);
router.delete('/operators/:id', authorize('admin'), adminController.deleteOperator);

module.exports = router;