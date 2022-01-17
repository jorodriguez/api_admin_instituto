const router = require('express').Router();
const corte = require('../controllers/corte');
const checkAuth = require('./check-auth');

//router.get('/',((re,res)=>{console.log("")}));
router.put('/corte/dia/sucursal/:id_sucursal',corte.getCorteDiaSucursal);

module.exports = router;