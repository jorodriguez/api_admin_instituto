const router = require('express').Router();
const inscripcion = require('../controllers/inscripcion');
const checkAuth = require('./check-auth');
//const {validarSchema} = require('./validacionMiddle');
const { validarSchemaInscripcion} = require('../validacion-shemas/inscripcionShema');

const val = (request,response,next)=>{
    checkAuth(request,response,next);
    validarSchemaInscripcion(request,response,next);
}

//inscripcion
router.post('/',val, inscripcion.guardarInscripcion);
router.get('/:id_sucursal',checkAuth, inscripcion.getInscripciones);
/*router.get('/:id_sucursal/eliminados/:eliminado?',checkAuth, alumno.getAlumnos);
router.get('/id/:id',checkAuth, alumno.getAlumnoById);
*/
module.exports = router;