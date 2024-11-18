const jwt = require('jsonwebtoken');

//middleware para autenticar JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(req.headers);
    if (!token) {
        return res.sendStatus(403);
    }

    //verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); 
        }
        req.user = user; 
        next(); 
    });
};

module.exports = authenticateJWT;