const express = require('express');
const ComplaintController = require('../../controllers/complaintController');
const authenticateJWT = require('../../middlewares/authenticateJWT');
const authorizeRole = require('../../middlewares/authorizeRole');
const router = express.Router();
const complaintController = new ComplaintController();

//ruta para agregar un reclamo 
router.post('/complaints', authenticateJWT, complaintController.addComplaint);

//ruta para obtener todos los reclamos 
router.get('/complaints', authenticateJWT, authorizeRole(1), complaintController.getAllComplaints); // ok

//ruta para obtener un reclamo por ID 
router.get('/complaints/:id', authenticateJWT, complaintController.getComplaintById); // ok

//ruta para que el cliente obtenga su reclamo 
router.get('/clients/:clientId/complaints', authenticateJWT, complaintController.getClientComplaints.bind(complaintController));

//ruta para que el cliente cancele un reclamo 
router.patch('/complaints/:id/cancel', authenticateJWT, complaintController.cancelComplaint); //ok cancelar reclamo

//ruta para eliminar un reclamo por ID 
router.delete('/complaints/:id', authenticateJWT, complaintController.delete);

//ruta para actualizar un reclamo existente 
router.patch('/complaints/:id', authenticateJWT, authorizeRole(1), complaintController.updateComplaint); //ok 

module.exports = router;
