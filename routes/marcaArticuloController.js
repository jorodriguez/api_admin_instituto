const router = require('express').Router();
const catMarcaController = require('../controllers/catMarcaController');
const checkAuth = require('./check-auth');

router.get('/:coEmpresa',checkAuth, catMarcaController.getAll);
router.post('/',checkAuth, catMarcaController.createMarca);

module.exports = router;