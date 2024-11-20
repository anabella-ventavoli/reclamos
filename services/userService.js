const userRepository = require('../database/user');
const db = require('../config/db');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

class UserService {

    // Crear reclamo
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

    // Generar reporte en formato CSV o PDF
async generateReport(format) {
    const data = await db.query('SELECT * FROM reclamos');
    const filePath = path.join(__dirname, '..', 'public', 'reporte.csv');
    if (format === 'csv') {
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write('ID,Asunto,Estado,Fecha\n');
        data[0].forEach(row => {
            const rowData = `${row.idReclamo},${row.asunto},${row.idReclamoEstado},${row.fechaCreado}\n`;
            writeStream.write(rowData);
        });
        //termina la escritura del archivo
        writeStream.end();
        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(fs.readFileSync(filePath)); 
            });
            writeStream.on('error', (err) => {
                reject(err);
            });
        });
    }
    // Generar reporte en formato PDF
    if (format === 'pdf') {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, '..', 'public', 'reporte.pdf');
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        // titulo del reporte
        doc.fontSize(18).text('Reporte de Reclamos', { align: 'center' });
        doc.moveDown();
        // datos del reporte
        doc.fontSize(12);
        data[0].forEach(row => {
            doc.text(`ID: ${row.idReclamo}, Asunto: ${row.asunto}, Estado: ${row.idReclamoEstado}, Fecha: ${row.fechaCreado}`);
            doc.moveDown();
        });
        doc.end();
        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(fs.readFileSync(filePath));
            });
            writeStream.on('error', (err) => {
                reject(err);
            });
        });
    }
    }
        
    //crear tipo reclamo
    async manageComplaintTypes(complaintTypeData) {
        const query = `INSERT INTO reclamostipo (descripcion, activo)
        VALUES (?, ?)`;
        const [result] = await db.query(query, [
        complaintTypeData.descripcion, 
        complaintTypeData.activo || 1,
        ]);
        return { idReclamo: result.insertId, ...complaintTypeData };
    }

}

module.exports = UserService;
