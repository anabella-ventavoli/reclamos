const express = require('express');
const ComplaintStatusController = require('../../controllers/complaintStatusController');
const authenticateJWT = require('../../middlewares/authenticateJWT');

const router = express.Router();
const complaintStatusController = new ComplaintStatusController();

//ruta para obtener todos los estados de reclamos
router.get('/complaint-status', authenticateJWT, complaintStatusController.getAllComplaintStatus);

//ruta para obtener un estado de reclamo por ID
router.get('/complaint-status/:idReclamoEstado', authenticateJWT, complaintStatusController.getById);

//ruta para agregar un nuevo estado de reclamo
router.post('/complaint-status', authenticateJWT, complaintStatusController.addComplaintStatus);

//ruta para modificar un estado de reclamo existente
router.patch('/complaint-status/:idReclamoEstado', authenticateJWT, complaintStatusController.updateComplaintStatus);

module.exports = router;
