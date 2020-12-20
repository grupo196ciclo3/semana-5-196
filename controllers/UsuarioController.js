const models = require("../models/index.js");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.js")

exports.login = async (req, res, next) => {    
    try {
        const user = await models.Usuario.findOne({ where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){                
                const token = await tokenService.encode(user);
                res.status(200).send({
                    auth: true,
                    tokenReturn: token,
                })
            }else{
                res.status(401).send({
                    auth: false,
                    accessToken: null,
                    message: "Incorrect username and/or password"
                })
            }
        }else{
            res.status(404).send({
                message: "Incorrect username and/or password"
            })
        }
    } catch (error) {

        res.status(500).send({
            message: "Error -> "
        })
        next(error);

    }
}