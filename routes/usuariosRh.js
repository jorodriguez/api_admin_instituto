const router = require('express').Router();
const usuarioService = require('../services/usuario');
const checkAuth = require('./check-auth');
const reporteAsistenciaUsuario = require('../services/reporte_asistencia_usuario');


router.post('/',usuarioService.desactivarUsuarioReporte);
router.get('/:id_sucursal',checkAuth,reporteAsistenciaUsuario.getUsuariosAsistencias);

module.exports = router;