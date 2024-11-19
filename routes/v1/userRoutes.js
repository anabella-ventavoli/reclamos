const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middlewares/authenticateJWT');
const authorizeRole = require('../../middlewares/authorizeRole');
const userController = require('../../controllers/userController');

//rutas de autenticacion
router.post('/login', userController.login); //ok

//rutas de clientes 
router.post('/complaints', authenticateJWT, authorizeRole(3), userController.createComplaint); 
router.get('/complaints', authenticateJWT, authorizeRole(3), userController.getComplaints); //ok
 
//rutas de empleados
router.put('/complaints/:id/attend', authenticateJWT, authorizeRole(2), userController.updateComplaintStatus); //ok
router.get('/complaints/assigned', authenticateJWT, authorizeRole(2), userController.getEmployeeTasks);

//rutas de administradores
router.post('/complaint-types', authenticateJWT, authorizeRole(1), userController.manageComplaintTypes);
router.get('/stats', authenticateJWT, authorizeRole(1), userController.getAdminStats);
router.get('/report/:format', authenticateJWT, authorizeRole(1), userController.downloadReport);

module.exports = router;
