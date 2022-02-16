const router = require('express').Router();
const ventaController = require('../controllers/ventaController');
const checkAuth = require('./check-auth');

//venta
router.post('/',checkAuth, ventaController.createVenta);

module.exports = router;