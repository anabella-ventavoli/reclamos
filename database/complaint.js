const db = require('../config/db');

class ComplaintRepository {
    //obtener todos los reclamos
    async getAll() {
        const query = 'SELECT * FROM reclamos';
        const [results] = await db.query(query);
        return results;
    }

    //obtener reclamo por id
    async getById(id) {
        const query = 'SELECT * FROM reclamos WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.length ? result[0] : null;
    }

    //obtener reclamos por cliente
    async getComplaintsByClient(clientId) {
        const query = 'SELECT * FROM reclamos WHERE idUsuarioCreador = ?';
        const [results] = await db.query(query, [clientId]);
        return results;
    }

    //obtener cliente por reclamo Agregado Anabella
    async getClientByComplaint(idComplaint) {
        const query = `
            SELECT 
                usuarios.idUsuario, 
                usuarios.nombre, 
                usuarios.apellido, 
                usuarios.correoElectronico 
            FROM 
                reclamos 
            JOIN 
                usuarios 
            ON 
                reclamos.idUsuarioCreador = usuarios.idUsuario 
            WHERE 
                reclamos.idReclamo = ?;
        `;
    
        const [results] = await db.query(query, [idComplaint]);
        return results;
    }
    

    //cancelar reclamo creado
    async cancelComplaint(id) {
        const query = 'UPDATE reclamos SET idReclamoEstado = 3, fechaCancelado = NOW() WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }

   //agregar un reclamo
   async add(userId, complaint) {
        console.log("El reclamos es...", complaint.complaintData);
        const query = `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idUsuarioFinalizador)
                    VALUES (?, ?, NOW(), 1, ?, ?, ?)`;
        const [result] = await db.query(query, [
        complaint.complaintData.asunto,
        complaint.complaintData.descripcion || null,
        complaint.complaintData.idReclamoTipo,
        userId,
        complaint.complaintData.idUsuarioFinalizador || null
            ]);
        return { idReclamo: result.insertId, ...complaint };
    }
   
    //eliminar reclamo por id
    async deleteById(id) {
        const query = 'DELETE FROM reclamo WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }

    //actualizar un reclamo
    async updateComplaint(idComplaint, jsonBody) {

        console.log("Datos recibidos", jsonBody);
        
        const query = 'UPDATE reclamos SET asunto = COALESCE(?, asunto), descripcion = COALESCE(?, descripcion), fechaCreado = COALESCE(?, fechaCreado), fechaFinalizado = COALESCE(?, fechaFinalizado), idReclamoEstado = COALESCE(?, idReclamoEstado), idReclamoTipo = COALESCE(?, idReclamoTipo), idUsuarioCreador = COALESCE(?, idUsuarioCreador), idUsuarioFinalizador = COALESCE(?, idUsuarioFinalizador) WHERE idReclamo = ?;';
    // Prepara los valores en el mismo orden que las columnas
    const values = [
        jsonBody.asunto || null,
        jsonBody.descripcion || null,
        jsonBody.fechaCreado || null,
        jsonBody.fechaFinalizado || null,
        jsonBody.idReclamoEstado || null,
        jsonBody.idReclamoTipo || null,
        jsonBody.idUsarioCreador || null,
        jsonBody.idUsuarioFinalizador || null,
        idComplaint];
    // Ejecuta la consulta
    const [result] = await db.query(query, values);

        return result.affectedRows > 0; // Devuelve true si se actualizó al menos una fila
    }
    
}

module.exports = ComplaintRepository;