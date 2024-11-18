const express = require('express');
const router = express.Router();
const OfficeController = require('../../controllers/officeController');


const officeController = new OfficeController(); 

router.get('/offices', officeController.getAllOffices.bind(officeController));          
router.get('/offices/:id', officeController.getOfficeById.bind(officeController));      
router.post('/offices', officeController.createOffice.bind(officeController));           
router.put('/offices/:id', officeController.updateOffice.bind(officeController));       
router.delete('/offices/:id', officeController.deleteOffice.bind(officeController));    

module.exports = router;
