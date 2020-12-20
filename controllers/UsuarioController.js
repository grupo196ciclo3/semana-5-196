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

exports.list = async (req, res, next) => {
    try {
        
        const users = await models.Usuario.findAll()
        res.status(200).json(users);
        

    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.add = async (req, res, next) => {
    try {

        const users = await models.Usuario.findOne({where: {email: req.body.email}})

        if(!users){
            const user = await models.Usuario.create(req.body);
            res.status(200).json(user);
        }else{
            res.status(409).send({
                message: "E-mail is already in use"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {

        const user = await models.Usuario.update({rol: req.body.rol, nombre: req.body.nombre}, 
        { where: { id: req.body.id } });
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.activate = async (req, res, next) => {
    try {
        const user = await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.deactivate = async (req, res, next) => {
    try {
        const user = await models.Usuario.update({ estado: 0 }, { where: { id: req.body.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}