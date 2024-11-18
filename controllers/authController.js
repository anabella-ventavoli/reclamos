//Se utiliza para comparar y encriptar contraseñas de forma segura
const bcrypt = require('bcryptjs');
const db = require('../config/db');

//Se utiliza para crear y firmar tokens JWT (JSON Web Tokens)
// para la autenticación
const jwt = require('jsonwebtoken');

class AuthController {
    //clave para firmar el token
    static SECRET_KEY =  process.env.SECRET_KEY; 

    async login(req, res) {
        const { correoElectronico, password } = req.body;
        //req.body Contiene los datos enviados en la solicitud POST
        //console.log(correoElectronico, password);
        try {
            const [user] = await db.query('SELECT idUsuario, correoElectronico, idUsuarioTipo, contrasenia FROM usuarios WHERE correoElectronico = ?', [correoElectronico]);

            console.log(user[0].correoElectronico)
            //comprueba si no se encontró un usuario con ese correo electrónico
            if (!user[0]) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            //bcrypt.compare compara la contraseña ingresada con la base de datos
            const passwordIsValid = await bcrypt.compare(password, user[0].contrasenia);

            if (!passwordIsValid) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            //genera el token JWT
            const token = jwt.sign(
                { correoElectronico: user[0].correoElectronico, 
                    rol: user[0].idUsuarioTipo,
                    id: user[0].idUsuario}, 
                    
                AuthController.SECRET_KEY, 
                { expiresIn: '1h' } 
            );
            console.log(token);

            return res.status(200).json({ message:'ok' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor' });
        }
    }
}

module.exports = AuthController;
