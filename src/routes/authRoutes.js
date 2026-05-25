const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrarse: POST http://localhost:3000/api/auth/register
router.post('/register', authController.register);

// Ruta para iniciar sesión: POST http://localhost:3000/api/auth/login
router.post('/login', authController.login);

module.exports = router;