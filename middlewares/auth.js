//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verifyAdmin: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token not found'
            });
        }
        const responseValid = await tokenService.decode(req.headers.token);
        if (responseValid.rol === 'Administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'Unauthorized'
            });
        }
    },
    verifySeller: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token not found'
            });
        }
        const responseValid = await tokenService.decode(req.headers.token);
        if (responseValid.rol === 'Administrador' || responseValid.rol === 'Vendedor') {
            next();
        } else {
            return res.status(403).send({
                message: 'Unauthorized'
            });
        }
    },
    verifySK: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token not found'
            });
        }
        const responseValid = await tokenService.decode(req.headers.token);
        if (responseValid.rol === 'Administrador' || responseValid.rol === 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'Unauthorized'
            });
        }
    },

}