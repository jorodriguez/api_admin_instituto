const router = require('express').Router();
const reporteAlumnosController = require('../controllers/reporteAlumnosController');
const reporteDashboardController = require('../controllers/reporteDashboardController');
const checkAuth = require('./check-auth');

router.get('/alumnos/:uidCurso',checkAuth,reporteAlumnosController.getReporteListaAlumnos);
router.get('/alumnos/html/:uidCurso/usuario/:idUsuario',checkAuth,reporteAlumnosController.getHtmlReporteListaAlumnos);

router.get('/contadores/:coEmpresa/sucursal/:coSucursal',checkAuth,reporteDashboardController.getContadoresDashboard);

module.exports = router;