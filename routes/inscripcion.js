const router = require('express').Router();
const inscripcion = require('../controllers/inscripcion');
const checkAuth = require('./check-auth');
//const {validarSchema} = require('./validacionMiddle');



//inscripcion
router.post('/',checkAuth, inscripcion.guardarInscripcion);
router.get('/:id_sucursal',checkAuth, inscripcion.getInscripciones);
router.get('/alumno/:uid',checkAuth, inscripcion.getInscripcionesAlumno);
/*router.get('/:id_sucursal/eliminados/:eliminado?',checkAuth, alumno.getAlumnos);
router.get('/id/:id',checkAuth, alumno.getAlumnoById);
*/
module.exports = router;