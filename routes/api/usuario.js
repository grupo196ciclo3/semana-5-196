const router = require('express').Router();
const usuarioController = require('../../controllers/UsuarioController');
const auth = require('../../middlewares/auth');

router.post('/login', usuarioController.login);

module.exports = router;