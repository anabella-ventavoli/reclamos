const db = require('../config/db');

class UserService {
   
    async getComplaints(userId) {
        const complaints = await db.query('SELECT * FROM reclamos WHERE reclamos.idUsuarioCreador = ?', [userId]);
        //log agregado Anabella
        complaints[0].map(complaint => {
        console.log(`Reclamo nro.: ${complaint.idReclamo}
Asunto: ${complaint.asunto}
Creado: ${complaint.fechaCreado}
Estado: ${complaint.idReclamoEstado}
Tipo: ${complaint.idReclamoTipo} \n`

        )
        });
        return complaints[0]
    }

    //metodo para buscar un usuario por su correo modificadooo
    async findUserByEmail(email) {
        try {
            const [user] = await db.query('SELECT * FROM usuarios WHERE usuarios.correoElectronico = ?', [email]);
            return user || null;
        } catch (error) {
            console.error('Error al buscar usuario por correo electrónico:', error);
            throw error;
        }
    }

    //metodo para buscar un usuario por su id
    async findUserById(userId) {
        try {
            const [user] = await db.query('SELECT * FROM usuarios WHERE  usuarios.idUsuario = ?', [userId]);
            return user || null;
        } catch (error) {
            console.error('Error al buscar usuario por id:', error);
            throw error;
        }
    }

    //metodo para actualizar la informacion del usuario
    async updateUser(userId, updatedData) {
        try {
            const result = await db.query('UPDATE usuario SET ? WHERE id = ?', [updatedData, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }

    //otener tareas de un empleado
    async getTasksForEmployee(userId) {
        try {
            const tasks = await db.query('SELECT oficinas.nombre AS nombre_oficina, reclamos.idReclamo, reclamos.descripcion, reclamos.fechaCreado FROM reclamos JOIN oficinas ON reclamos.idReclamoTipo = oficinas.idReclamoTipo JOIN usuariosoficinas ON oficinas.idOficina = usuariosoficinas.idOficina JOIN usuarios ON usuariosoficinas.idUsuario = usuarios.idUsuario WHERE usuarios.idUsuario = ?', [userId]);
            return tasks;
        } catch (error) {
            console.error('Error al obtener tareas del empleado:', error);
            throw error;
        }
    }

    //obtener estadisticas
    async getStatistics() {
        try {
            const [totalReclamos] = await db.query('SELECT COUNT(*) AS count FROM reclamo');
            return { totalReclamos: totalReclamos.count };
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            throw error;
        }
    }

     //verificacion de inicio de sesion
     async login(username, password) {
        const user = await this.findUserByEmail(username);
        if (!user || !(await bcrypt.compare(password, user.contrasenia))) { 
            throw new Error('Credenciales inválidas');
        }
        
        //generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.correoElectronico },
            process.env.SECRET_KEY, 
            { expiresIn: '1h' } 
        );

        return token; 
    }
}

module.exports = new UserService();
