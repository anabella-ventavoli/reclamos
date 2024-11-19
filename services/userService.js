const userRepository = require('../database/user');

class UserService {

    // Crear reclamo, agregado por mi 
    async createComplaint(userId, complaintData) {
        const complaints = await userRepository.createComplaint(userId, complaintData);
        return complaints;
    }

    // Obtener reclamos
    async getComplaints(userId) {
        //const complaints = await db.Complaints.findAll({ where : userId})
        const complaints= await userRepository.getComplaints(userId)
        return complaints}

    // Buscar un usuario por correo 
    async findUserByEmail(email) {
        return await userRepository.findUserByEmail(email);
    }

    // Buscar un usuario por id 
    async findUserById(userId) {
        return await userRepository.findUserById(userId);
    }

    // Actualizar informacion de usuario
    async updateUser(userId, updatedData) {
        return await userRepository.updateUser(userId, updatedData);
    }

    // Obtener tareas de un empleado
    async getTasksForEmployee(userId) {
        return await userRepository.getTasksForEmployee(userId);
    }

    // Obtener estadisticas
    async getStatistics() {
        return await userRepository.getStatistics();
    }

    // Verificar contraseña 
    async verifyPassword(inputPassword, userPassword) {
        return inputPassword === userPassword; 
    }

}

module.exports = UserService;
