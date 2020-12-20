const router = require('express').Router();
const usuarioRouter = require('./api/usuario.js');
const categoriaRouter = require('./api/categoria.js');
const articuloRouter = require('./api/articulo.js');

router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

module.exports = router;