const complaintRepository = require('../database/complaint');

class ComplaintService {
    //obtener todos los reclamos
    async getAll() {
        return await complaintRepository.getAll();
    }

    //otener reclamo por id
    async getById(id) {
        return await complaintRepository.getById(id);
    }

    //obtener reclamos por cliente
    async getComplaintsByClient(clientId) {
        return await complaintRepository.getComplaintsByClient(clientId);
    }

    //cancelar un reclamo creado por el cliente
    async cancelComplaint(id, clientId) {
        const complaint = await complaintRepository.getById(id);
        if (!complaint || complaint.idUsuarioCreador !== clientId || complaint.idReclamoEstado !== 1) {
            return false;
        }
        return await complaintRepository.cancelComplaint(id);
    }

    //agregar un reclamo
    async add(userId, complaint) {
        return await complaintRepository.add(userId, complaint);
    }

    //eliminar un reclamo por id
    async deleteById(id) {
        return await complaintRepository.deleteById(id);
    }

    //actualizar un reclamo
    async updateComplaint(id, complaint) {
        return await complaintRepository.updateComplaint(id, complaint);
    }
}

module.exports = ComplaintService;
