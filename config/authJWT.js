const connection = require('./db');
const bcrypt = require('bcryptjs');

//para encontrar un usuario en la base de datos
async function findUserInDatabase(correoElectronico) {
    const [rows] = await connection.execute('SELECT * FROM usuario WHERE correoElectronico = ?', [correoElectronico]); // Cambiado a correoElectronico
    return rows[0];
}

//para validar la contraseña
async function isPasswordValid(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { findUserInDatabase, isPasswordValid };
