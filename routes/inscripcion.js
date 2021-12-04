const router = require('express').Router();
const inscripcion = require('../controllers/inscripcion');
const checkAuth = require('./check-auth');

//inscripcion
//router.post('/',checkAuth, alumno.createAlumno);
router.get('/:id_sucursal',checkAuth, inscripcion.getInscripciones);
/*router.get('/:id_sucursal/eliminados/:eliminado?',checkAuth, alumno.getAlumnos);
router.get('/id/:id',checkAuth, alumno.getAlumnoById);
*/
module.exports = router;