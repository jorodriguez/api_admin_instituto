const router = require('express').Router();
const alumno = require('../controllers/alumno');
const checkAuth = require('./check-auth');

//alumno
router.post('/',checkAuth, alumno.createAlumno);
router.get('/:id_sucursal',checkAuth, alumno.getAlumnos);
router.get('/:id_sucursal/eliminados/:eliminado?',checkAuth, alumno.getAlumnos);
router.get('/id/:id',checkAuth, alumno.getAlumnoById);
router.put('/:id',checkAuth, alumno.updateAlumno);
router.put('/baja/:id',checkAuth, alumno.bajaAlumno);
router.put('/activar/:id',checkAuth, alumno.activarAlumnoEliminado);

module.exports = router;