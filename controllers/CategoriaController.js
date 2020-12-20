const models = require("../models/index.js")

exports.list = async (req, res, next) => {
    try {
        
        const categories = await models.Categoria.findAll()
        res.status(200).json(categories);
        

    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.add = async (req, res, next) => {
    try {

        const category = await models.Categoria.findOne({where: {nombre: req.body.nombre}})
        if(!category){
            const category = await models.Categoria.create(req.body);
            res.status(200).json(category);
        }else{
            res.status(409).send({
                message: "Category already exists"
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
        const category = await models.Categoria.update({ nombre: req.body.nombre, descripcion:
        req.body.descripcion }, { where: { id: req.body.id } });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.activate = async (req, res, next) => {
    try {
        const category = await models.Categoria.update({ estado: 1 }, { where: { id: req.body.id } });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.deactivate = async (req, res, next) => {
    try {
        const category = await models.Categoria.update({ estado: 0 }, { where: { id: req.body.id } });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}