const router = require('express').Router();
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth');

router.get('/list', categoriaController.list);
router.post('/add', auth.verifySK, categoriaController.add);
router.put('/update', auth.verifySK, categoriaController.update);
router.put('/activate', auth.verifySK, categoriaController.activate);
router.put('/deactivate', auth.verifySK, categoriaController.deactivate);

module.exports = router;