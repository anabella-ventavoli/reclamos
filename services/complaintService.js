const ComplaintRepository = require('../database/complaint');
const complaintRepository = new ComplaintRepository;
const Notifications = require('./notificationsService');
const notifications = new Notifications;

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
    async updateComplaint(idComplaint, jsonBody) {
        //console.log(idComplaint);
        //console.log(jsonBody); 
        const exists = await complaintRepository.getById(idComplaint);
        if (exists === null) {
            return {estado: false, menssaje: "el id no existe"};
        }
        console.log(exists);
        //modificar el reclamo
        const modified = await complaintRepository.updateComplaint(idComplaint, jsonBody);
        if (!modified) {
            return {estado: false, menssaje: "no se pudo modificar el reclamo"};
        }

        //buscar datos del cliente
        const client = await complaintRepository.getClientByComplaint(idComplaint);
        if (!client) {
            return {estado: false, menssaje: "no se pudo encontrar el cliente"};
        }

        const infoMail = {
            name: client[0].nombre,
            lastname: client[0].apellido,
            email: client[0].correoElectronico,
            complaint: idComplaint
        }
        console.log(infoMail);
        // enviar la notificacion
        return await notifications.sendEmail(infoMail);
    }
}

module.exports = ComplaintService;
