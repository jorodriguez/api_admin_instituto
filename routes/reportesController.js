const router = require('express').Router();
const reporteAlumnosController = require('../controllers/reporteAlumnosController');
const checkAuth = require('./check-auth');

router.get('/alumnos/:uidCurso',checkAuth,reporteAlumnosController.getReporteListaAlumnos);

module.exports = router;