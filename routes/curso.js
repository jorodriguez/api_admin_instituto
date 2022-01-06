const router = require('express').Router();
const curso = require('../controllers/curso');
const checkAuth = require('./check-auth');

//curso
router.post('/',checkAuth, curso.createCurso);
router.post('/iniciar',checkAuth, curso.iniciarCurso);
router.put('/eliminar/:id',checkAuth, curso.deleteCurso);
router.put('/:id',checkAuth, curso.updateCurso);
router.get('/sucursal/:id',checkAuth, curso.getCursosActivosSucursal);
router.get('/uid/:uid',checkAuth, curso.getCursosByUid);
router.get('/:id_sucursal/:id_especialidad',checkAuth, curso.getCursosActivos);


module.exports = router;