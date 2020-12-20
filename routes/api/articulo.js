const router = require('express').Router();
const articuloController = require('../../controllers/ArticuloController');
const auth = require('../../middlewares/auth');

router.get('/list', articuloController.list);
router.post('/add', auth.verifySeller,articuloController.add);
router.put('/update', auth.verifySeller,articuloController.update);
router.put('/activate', auth.verifySeller,articuloController.activate);
router.put('/deactivate', auth.verifySeller,articuloController.deactivate);

module.exports = router;