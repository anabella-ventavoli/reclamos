const db = require('../config/db');

class ComplaintStatus {

    //obtener todos los estados de reclamos activos
    async getAll() {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';
        const [result] = await db.query(sql);
        return result;
    }

    //obtener un estado de reclamo por su ID
    async getById(idComplaintStatus) {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamoEstado = ?';
        const [result] = await db.query(sql, [idComplaintStatus]);
        return (result.length > 0) ? result[0] : null;
    }

    //crear un nuevo estado de reclamo
    async create({ descripcion, activo }) {
        const sql = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?, ?)';
        const [result] = await db.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0) {
            throw new Error("No se pudo crear el estado del reclamo.");
        }
        
        return this.getById(result.insertId);
    }

    //actualizar un estado de reclamo existente
    async update(idComplaintStatus, { descripcion, activo }) {
        const sql = 'UPDATE reclamos_estado SET descripcion = ?, activo = ? WHERE idReclamoEstado = ?';
        const [result] = await db.query(sql, [descripcion, activo, idComplaintStatus]);
        return result.affectedRows > 0;
    }
}

module.exports = ComplaintStatus;
