const mysql = require('mysql2/promise');

//configuracion de la conexion a MySQL
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',  
    password: 'mysqladmin',  
    database: 'reclamos1',
    port: 3306,
});

//para usar en otros archivos
module.exports = connection;
