const router = require('express').Router();
const catUnidadMedidaController = require('../controllers/catUnidadMedidaController');
const checkAuth = require('./check-auth');

router.get('/:coEmpresa',checkAuth, catUnidadMedidaController.getAll);
router.post('/',checkAuth, catUnidadMedidaController.createUnidadMedida);

module.exports = router;