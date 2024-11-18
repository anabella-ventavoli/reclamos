const officeService = require('../services/officeService');

class OfficeController {
    //obtener todas las oficinas
    async getAllOffices(req, res) {
        try {
            const offices = await officeService.getAllOffices();
            res.status(200).json(offices);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las oficinas', error });
        }
    }

    //obtener una oficina por ID
    async getOfficeById(req, res) {
        const { id } = req.params;
        try {
            const office = await officeService.getOfficeById(id);
            if (office) {
                res.status(200).json(office);
            } else {
                res.status(404).json({ message: 'Oficina no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la oficina', error });
        }
    }

    //crear nueva oficina
    async createOffice(req, res) {
        const { nombre } = req.body;
        try {
            const newOffice = await officeService.createOffice(nombre);
            res.status(201).json(newOffice);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la oficina', error });
        }
    }

    //actualizar una oficina
    async updateOffice(req, res) {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            const updated = await officeService.updateOffice(id, nombre);
            if (updated) {
                res.status(200).json({ message: 'Oficina actualizada con éxito' });
            } else {
                res.status(404).json({ message: 'Oficina no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la oficina', error });
        }
    }

    //eliminar una oficina
    async deleteOffice(req, res) {
        const { id } = req.params;
        try {
            const deleted = await officeService.deleteOffice(id);
            if (deleted) {
                res.status(200).json({ message: 'Oficina eliminada con éxito' });
            } else {
                res.status(404).json({ message: 'Oficina no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la oficina', error });
        }
    }
}

module.exports = OfficeController;
