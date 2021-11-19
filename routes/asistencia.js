const router = require('express').Router();
const asistencia = require('../services/asistencia');
const checkAuth = require('./check-auth');

router.get('/alumnos_recibidos/:id_sucursal',checkAuth, asistencia.getAlumnosRecibidos);
router.get('/alumnos_por_recibidos/:id_sucursal',checkAuth, asistencia.getAlumnosPorRecibir);
router.post('/entradaAlumnos',checkAuth, asistencia.registrarEntradaAlumnos);
router.post('/salidaAlumnos',checkAuth, asistencia.registrarSalidaAlumnos);
router.get('/salidaAlumnos/alumno_tiempo_extra/:lista_id_asistencias',checkAuth, asistencia.getListaAsistenciaAlumnoPorSalirConHorasExtras);

router.get('/reporte/:id_sucursal/:fecha',checkAuth, asistencia.getListaAsistenciaPorSucursalFecha);
router.get('/reporte_por_alumno/:id_alumno',checkAuth, asistencia.getListaAsistenciaMesPorAlumno);
router.get('/reporte_mes_alumno/:id_alumno', checkAuth,asistencia.getListaMesAsistenciaPorAlumno);
router.get('/reporte_mes_sucursal/:id_sucursal',checkAuth, asistencia.getListaMesAsistenciaPorSucursal);
router.get('/mensual/:id_alumno',checkAuth, asistencia.getListaAsistenciaMesPorAlumno);

module.exports = router;