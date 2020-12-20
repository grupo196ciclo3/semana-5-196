const models = require("../models/index.js")

exports.list = async(req, res, next) => {
    try {
        const articles = await models.Articulos.findAll({
            attributes:{
                exclude: ['categoriaId', "createdAt", "updatedAt"],  
            },
            include: {
                model: models.Categoria,
                as: "categoria",
                required: true,
                attributes: ["nombre"]
            }
        })
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.add = async (req, res, next) => {
    try {

        const article = await models.Articulos.create(req.body);
        res.status(200).json(article);

    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {

        const article = await models.Articulos.update({codigo: req.body.codigo, nombre: req.body.nombre, descripcion:
        req.body.descripcion }, { where: { id: req.body.id } });
        res.status(200).json(article);

    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.activate = async (req, res, next) => {
    try {
        
        const article = await models.Articulos.update({ estado: 1 }, { where: { id: req.body.id } });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}

exports.deactivate = async (req, res, next) => {
    try {
        const article = await models.Articulos.update({ estado: 0 }, { where: { id: req.body.id } });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).send({
            message: "Error -> "
        })
        next(error)
    }
}