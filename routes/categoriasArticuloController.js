const router = require('express').Router();
const articuloController = require('../controllers/articuloController');

const checkAuth = require('./check-auth');

router.get('/:coSucursal',checkAuth, articuloController.getCategoriaArticulos);
router.put('/:id',checkAuth, articuloController.mo);

module.exports = router;