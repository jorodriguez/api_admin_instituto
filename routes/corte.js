const router = require('express').Router();
const corte = require('../controllers/corte');
const checkAuth = require('./check-auth');

router.get('/:id_sucursal',checkAuth,corte.getCorteDiaSucursal);

module.exports = router;