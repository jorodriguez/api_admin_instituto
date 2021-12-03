const router = require('express').Router();
const especialidad = require('../controllers/especialidad');
const checkAuth = require('./check-auth');

//especialidad
router.get('/:id_empresa',checkAuth, especialidad.getEspecialidad);

module.exports = router;