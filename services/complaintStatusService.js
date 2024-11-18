const ComplaintStatusService = require("../database/complaintStatus.js");

class ComplaintStatusService {
    //obtener todos los estados de reclamos activos
    async getAll() {
        return await this.complaintStatus.getAll();
    }

    //obtener un estado de reclamo por su ID
    async getById(idComplaintStatus) {
        return await this.complaintStatus.getById(idComplaintStatus);
    }

    //crear un nuevo estado de reclamo
    async create(complaintStatus) {
        return await this.complaintStatus.create(complaintStatus);
    }

    //actualizar un estado de reclamo existente
    async update(idComplaintStatus, complaintStatus) {
        return await this.complaintStatus.update(idComplaintStatus, complaintStatus);
    }

}

module.exports = ComplaintStatusService;
