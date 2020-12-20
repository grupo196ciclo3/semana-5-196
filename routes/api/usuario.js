const router = require('express').Router();
const usuarioController = require('../../controllers/UsuarioController');
const auth = require('../../middlewares/auth');

router.post('/login', usuarioController.login);
router.get('/list', auth.verifyAdmin, usuarioController.list);
router.post('/add', auth.verifyAdmin, usuarioController.add);
router.put('/update', auth.verifyAdmin, usuarioController.update);
router.put('/activate', auth.verifyAdmin, usuarioController.activate);
router.put('/deactivate', auth.verifyAdmin, usuarioController.deactivate);

module.exports = router;