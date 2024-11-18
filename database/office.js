const db = require('../config/db');

class office{
    //obtener todas las oficinas
    async getAll() {
        const query = 'SELECT * FROM oficinas';
        const [results] = await db.query(query);
        return results;
    }

    //obtener oficina por id
    async getById(id) {
        const query = 'SELECT * FROM oficinas WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.length ? result[0] : null;
    }

    //agregar una nueva oficina
    async add(office) {
        const query = 'INSERT INTO oficinas (nombre) VALUES (?)';
        const [result] = await db.query(query, [office.nombre]);
        return { id: result.insertId, ...office };
    }

    //actualizar una oficina
    async update(id, office) {
        const query = 'UPDATE oficinas SET nombre = ? WHERE id = ?';
        const [result] = await db.query(query, [office.nombre, id]);
        return result.affectedRows > 0;
    }

    //eliminar oficina por id
    async deleteById(id) {
        const query = 'DELETE FROM oficinas WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = office;