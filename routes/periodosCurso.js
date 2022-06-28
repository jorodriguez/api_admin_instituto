const router = require('express').Router();
const curso = require('../controllers/curso');
const semanasCurso = require('../controllers/semanasCurso');
const checkAuth = require('./check-auth');

//periodosCurso
router.get('/curso/:uid',checkAuth, curso.getSeriesPeriodosCurso);
router.get('/semanas/pendientes/:uidCurso/:idAlumno',checkAuth, semanasCurso.getSemanasColegiaturasParaCargo);
router.get('/semanas/calculadas/:fecha_inicio/:numero_semanas', semanasCurso.getSemanasCalculadasPreviewPagosCurso);
  

module.exports = router;