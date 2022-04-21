const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
const checkAuth = require('./check-auth');


router.get('/:id_sucursal',checkAuth, usuarioController.getUsuariosPorSucursal);
router.get('/buscar/:id_usuario',checkAuth, usuarioController.buscarUsuarioPorId);
router.post('/',checkAuth, usuarioController.crearUsuario);
router.put('/', checkAuth,usuarioController.modificarUsuario);
router.put('/:id_usuario',checkAuth, usuarioController.desactivarUsuario);


module.exports = router;