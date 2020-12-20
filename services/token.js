var jwt = require('jsonwebtoken');
const models = require('../models/index.js');

async function checkToken(token) {
    let _id = null;
    try {
        const { id } = await jwt.decode(token);
        _id = id;
    } catch (error) {
        return false;
    }
    const user = await models.Usuario.findOne({where: {
        id: _id,
        estado: 1,
    }});
    if (user) {
        const token = encode(user);
        return token;
    } else {
        return false;
    }
}


module.exports = {

    //generar el token
    encode: async(user) => {
        const token = jwt.sign({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
        },
        "SecretKey",
        {
            expiresIn: 86400,
        })
        
        return token;

    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, "SecretKey")
            const user = await models.Usuario.findOne({where: {
                id: id,
                estado: 1,
            }})
            if(user){
                return user;
            }else{
                return false;
            }
        } catch (error) {
            const newToken = checkToken(token);
            return newToken
        }

    }
}