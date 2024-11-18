const UserService = require('./userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

class authService {
    async login(correoElectronico, contrasenia) {
        const user = await UserService.findUserByEmail(correoElectronico);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        //generar un token JWT
        const token = jwt.sign(
            { id: user.idUsuario, role: user.idTipoUsuario }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return token;
    }
}

module.exports = authService;
