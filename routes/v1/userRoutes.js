const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middlewares/authenticateJWT');
const authorizeRole = require('../../middlewares/authorizeRole');
const userController = require('../../controllers/userController');

//rutas de autenticacion
router.post('/login', userController.login); //ok loguearse

//rutas de clientes 
router.post('/complaints', authenticateJWT, authorizeRole(3), userController.createComplaint); //ok crear reclamno
router.get('/complaints', authenticateJWT, authorizeRole(3), userController.getComplaints); //ok obtener reclamo de usuario
 
//rutas de empleados
router.put('/complaints/:id/attend', authenticateJWT, authorizeRole(2), userController.updateComplaintStatus); //ok edita estado reclamo
router.get('/complaints/assigned', authenticateJWT, authorizeRole(2), userController.getEmployeeTasks); //ok traer reclamos a cargo de un empleado

//rutas de administradores
router.post('/complaint-types', authenticateJWT, authorizeRole(1), userController.manageComplaintTypes); //ok
router.get('/stats', authenticateJWT, authorizeRole(1), userController.getAdminStats); //
router.get('/report/:format', authenticateJWT, authorizeRole(1), userController.downloadReport); //ok

module.exports = router;
