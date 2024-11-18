const ComplaintStatus = require('../services/complaintStatus'); 
class ComplaintStatusController {

    //obtener todos los estados de reclamos
    async getAllComplaintStatuses(req, res) {
        try {
            const statuses = await ComplaintStatus.fetchAll();
            res.status(200).json(statuses);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los estados de reclamos.", error: error.message });
        }
    }

    //obtener un estado de reclamo por ID
    async getComplaintStatusById(req, res) {
        const { id } = req.params;
        try {
            const status = await ComplaintStatus.fetchById(id);
            if (status) {
                res.status(200).json(status);
            } else {
                res.status(404).json({ mensaje: "Estado de reclamo no encontrado." });
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener el estado de reclamo.", error: error.message });
        }
    }

    //crear un nuevo estado de reclamo
    async createComplaintStatus(req, res) {
        const { descripcion, activo } = req.body;
        try {
            const newStatus = await ComplaintStatus.create({ descripcion, activo });
            res.status(201).json(newStatus);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el estado de reclamo.", error: error.message });
        }
    }

    //actualizar un estado de reclamo existente
    async updateComplaintStatus(req, res) {
        const { id } = req.params;
        const { descripcion, activo } = req.body;
        try {
            const updated = await ComplaintStatus.update(id, { descripcion, activo });
            if (updated) {
                res.status(200).json({ mensaje: "Estado de reclamo actualizado con éxito." });
            } else {
                res.status(404).json({ mensaje: "Estado de reclamo no encontrado." });
            }
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el estado de reclamo.", error: error.message });
        }
    }
}

module.exports = ComplaintStatusController;
