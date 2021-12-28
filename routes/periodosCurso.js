const router = require('express').Router();
const curso = require('../controllers/curso');
const checkAuth = require('./check-auth');

//periodosCurso
router.get('/curso/:uid',checkAuth, curso.getSeriesPeriodosCurso);

module.exports = router;