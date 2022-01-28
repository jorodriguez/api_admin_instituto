const router = require('express').Router();
const curso = require('../controllers/curso');
const semanasCurso = require('../controllers/semanasCurso');
const checkAuth = require('./check-auth');

//periodosCurso
router.get('/curso/:uid',checkAuth, curso.getSeriesPeriodosCurso);
router.get('/semanas/pendientes/:uidCurso/:idAlumno',checkAuth, semanasCurso.getSemanasColegiaturasParaCargo);

module.exports = router;