// routes/authRoutes.js
const express = require('express');
const AuthController =  require('../../controllers/authController');


const router = express.Router();
const authController = new AuthController();

// Ruta para iniciar sesion - lógica de autenticación del usuario
router.post('/login', authController.login);

module.exports = router;

