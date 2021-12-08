const app = require('./routes/app');

const multer = require('multer');
const fileUpload = multer();

//const alumno = require('./services/alumno');
const authController = require('./auth/AuthController');
const pagos = require('./controllers/pagos');
const cargos = require('./controllers/cargos');
const mensajeria = require('./controllers/mensajesFirebase');
const tareasProgramadas = require('./controllers/tareas_programadas');
const schedule = require('node-schedule');
const { configuracion } = require('./config/ambiente');
const reporteDeudas = require('./controllers/reporteDeudas');
const reporte_mensualidades = require('./controllers/reporte_mensualidades');
const utilerias = require('./controllers/utilerias');
const gastos = require('./controllers/gastos');
const reporte_gastos = require('./controllers/reporteGastos');
const sucursales = require('./controllers/sucursal');
const alumnoSucursal = require('./controllers/alumno_sucursal');
const usuarioService = require('./controllers/usuario');
const catagolos = require('./controllers/catalogos');
const conf = require('./controllers/configuracion');
const https = require("https");
const { validarTokenCompleto } = require('./helpers/helperToken');
const recargoService = require('./controllers/recargos');
const reporteContabilidad = require('./controllers/reporteContabilidad');
const uploadCloudinary = require('./controllers/uploadCloudinary');
const avisos = require('./controllers/avisos');

const checkAuth = require('./routes/check-auth');
const loginRoutes = require('./routes/login');
const alumnoRoute = require('./routes/alumno');
const cursoRoute = require('./routes/curso');
const inscripcionRoute = require('./routes/inscripcion');
const especialidadRoute = require('./routes/especialidad');
const asistenciaUsuariosRoute = require('./routes/asistenciaUsuarios');
const usuarioRhRoute = require('./routes/usuariosRh');
const catDiaRoute = require('./routes/catDia');
const catHorario = require('./routes/catHorario');


app.use('/auth',loginRoutes);
app.use('/alumnos',alumnoRoute);
app.use('/curso',cursoRoute);
app.use('/inscripcion',inscripcionRoute);
app.use('/especialidad',especialidadRoute);
app.use('/dias',catDiaRoute);
app.use('/horarios',catHorario);

//Cambio de sucursal
app.get('/sucursal_usuario/:id', authController.obtenerSucursalesUsuario);
app.put('/sucursal_usuario', authController.cambiarSucursalUsuario);

//Asistencia Usuarios
app.use('/asistencia_usuarios',asistenciaUsuariosRoute);

app.use('/usuarios_rh',usuarioRhRoute);

app.get('/genero_alumno', checkAuth,catagolos.getCatGeneroAlumno);


//pagos
app.post('/pagos/registrar',checkAuth, pagos.registrarPago);
app.post('/pagos/:id_alumno',checkAuth, pagos.registrarPago);
app.get('/pagos/:id_cargo_balance_alumno',checkAuth, pagos.getPagosByCargoId);
//Reenviar correo
app.put('/pagos/reenviar_comprobante',checkAuth, pagos.reenviarComprobantePago);

app.post('/cargos/registrar',checkAuth, cargos.registrarCargo);
app.get('/cargos/:id_empresa', checkAuth,cargos.getCatalogoCargosPorEmpresa);
app.get('/cargos/alumno/:id_alumno/:limite',checkAuth, cargos.getCargosAlumno);
app.get('/balance/:id_alumno',checkAuth, cargos.getBalanceAlumno);
app.put('/cargos/:id_alumno',checkAuth, cargos.eliminarCargos);


//app.get('/cargos/meses_adeuda/:id_alumno', pagos.obtenerMesesAdeudaMensualidad);
app.get('/cargos_meses_adeuda/:id_alumno', checkAuth,cargos.obtenerMesesAdeudaMensualidad);

//recargos proximos
//app.get('/mensualidad/vence_semana_actual/:id_sucursal', recargoService.obtenerPagosVencenSemanaActual);
app.get('/mensualidad/vence_semana_actual/:id_sucursal',checkAuth, recargoService.obtenerPagosVencenSemanaActual);
//recargos de hoy 
app.get('/mensualidad/vence_hoy',checkAuth, recargoService.obtenerMensualidadesRecargoHoy);

app.get('/mensualidad/ejecutar',checkAuth, recargoService.ejecutarRecargosMensualidad);

app.get('/formas_pagos', checkAuth,catagolos.getFormasPago);

//Reporte
app.get('/balance_sucursal/:id_usuario',checkAuth, reporteDeudas.getReporteBalancePorSucursal);
app.get('/balance_alumnos_sucursal/:id_sucursal/:id_tipo_cargo',checkAuth, reporteDeudas.getReporteBalanceAlumnosSucursal);

app.get('/balance_crecimiento/:id_usuario', checkAuth,reporteDeudas.getReporteCrecimientoBalancePorSucursal);
app.get('/balance_crecimiento_alumnos/:id_sucursal', checkAuth,reporteDeudas.getReporteCrecimientoBalanceAlumnosSucursal);

app.get('/balance_crecimiento_global/:id_usuario', checkAuth,reporteDeudas.getReporteCrecimientoGlobal);
app.get('/balance_crecimiento_mensual/:id_sucursal', checkAuth,reporteDeudas.getReporteCrecimientoMensualSucursal);
app.get('/alumnos_balance_crecimiento_mensual_sucursal/:id_sucursal/:mes_anio',checkAuth, reporteDeudas.getReporteAlumnosMensualCrecimiento);

//-Estado de cuenta
app.get('/estado_cuenta/:id_alumno',checkAuth,cargos.obtenerEstadoCuentaAlumno);
app.get('/estado_cuenta/preview/:id_alumno',checkAuth, cargos.obtenerHtmlPreviewEstadoCuenta);
app.post('/estado_cuenta/enviar',checkAuth,cargos.enviarEstadoCuentaAlumno);

app.get('/meses_activos', checkAuth,utilerias.getMesesActivos);

//alumnos crecimiento mes
app.get('/alumnos_crecimiento_mes/:anio/:mes/:id_usuario',checkAuth, reporteDeudas.getReporteAlumnosNuevosIngresosGlobal);

//gastos
app.get('/gastos/:co_sucursal/:anio_mes',checkAuth, gastos.getGastosPorSucursal);
app.get('/historico_gastos/:co_sucursal',checkAuth, gastos.getSumaMesGastosPorSucursal);
app.post('/gastos',checkAuth, gastos.registrarGasto);
app.put('/gastos',checkAuth, gastos.modificarGasto);
app.delete('/gastos/:id', checkAuth,gastos.eliminarGasto);
app.get('/tipos_gasto/:id_empresa',checkAuth, gastos.getCatalogoTipoGastoPorEmpresa);

//Reporte de gastos
//app.get('/reporte_gastos', reporte_gastos.getReporteGastosSucursalesMensual);
app.get('/reporte_gastos_sucursales/:id_usuario',checkAuth, reporte_gastos.getReporteGastosSucursalesMensualActual);
//app.get('/reporte_gastos/:mes_anio', reporte_gastos.getReporteGastosSucursalesMensual);
app.get('/reporte_gastos/:id_sucursal',checkAuth, reporte_gastos.getReporteGastosMensualesPorSucursalTrend);
app.get('/reporte_gastos/:id_sucursal/:mes_anio',checkAuth, reporte_gastos.getReporteDetalleGastosPorSucursal);
app.get('/reporte_gastos_global/:id_usuario',checkAuth, reporte_gastos.getReporteGastosGlobal);
app.get('/reporte_gastos_mes_actual/:id_usuario',checkAuth, reporte_gastos.getReporteGastoMensualActual);


//catalogo de maestros
app.get('/usuario/:id_sucursal',checkAuth, usuarioService.getUsuariosPorSucursal);
app.get('/usuario/buscar/:id_usuario',checkAuth, usuarioService.buscarUsuarioPorId);
app.post('/usuario',checkAuth, usuarioService.crearUsuario);
app.put('/usuario', checkAuth,usuarioService.modificarUsuario);
app.put('/usuario/:id_usuario',checkAuth, usuarioService.desactivarUsuario);

//AVISOS
app.get('/aviso/:id_usuario',checkAuth, avisos.getAvisosUsuario);
app.get('/aviso/tags/:idUsuario',checkAuth, avisos.getTagsContactos);
app.get('/aviso_preview/:idEmpresa/:htmlAviso',checkAuth,avisos.obtenerHtmlPreviewAviso);
app.post('/aviso',checkAuth, avisos.registrarAviso);
app.put('/aviso/:id',checkAuth, avisos.modificarAviso);
app.delete('/aviso',checkAuth,avisos.eliminarAvisos);

//Avisos para ver el la APP
app.get('/aviso_familiar/:id_familiar',avisos.getAvisosPorFamiliar);

//Para movil
//Login Clientes - Papás
//consultas para App
//------------------------------------------------
//app.post('/auth_cliente/login', authClientesController.loginCliente);

//------------------------------------------------


//reporte de mensualidades facturadas
app.get('/sucursal_usuario/sucursales_asignadas/:id_usuario',checkAuth, usuarioService.getSucursalesUsuario);
app.get('/reporte_mensualidades/:id_sucursal/:anio',checkAuth, reporte_mensualidades.getMensualidadesAlumnosSucursal);
app.get('/cargos/filtro_anios/:id_sucursal', checkAuth,cargos.obtenerFiltroAniosCargosSucursal);

app.get('/reporte_mensualidades_mes_actual/:id_usuario', checkAuth,reporte_mensualidades.getReporteContadoresSucursalesMesActual);
app.get('/reporte_mensualidades/:id_sucursal/:id_usuario', checkAuth,reporte_mensualidades.getReporteContadoresMesesPorSucursal);
app.get('/reporte_mensualidades/:id_sucursal/:mes', checkAuth,reporte_mensualidades.getReporteMensualidadesPorSucursalMes);

//configuracion
app.get('/configuracion',checkAuth, conf.getConfiguracion);


//sucursales y cambios
app.get('/sucursal/:id_empresa', checkAuth,sucursales.getSucursalPorEmpresa);
app.put('/cambio_sucursal/:id_alumno',checkAuth, alumnoSucursal.cambiarSucursalAlumno);

//reporte ingresos vs cargos
app.get('/reporte_ingreso_menos_gasto_mensual/:id_sucursal/:mes',checkAuth, reporteDeudas.getReporteGastosIngresosSucursalPorMes);

// Reporte de cobranza - para la contadora
app.put('/reporte_cobranza',checkAuth, reporteContabilidad.getReporteCobranzaPorFechas);

//Subir imagen
app.post('/foto_perfil',checkAuth, fileUpload.single('image'), (req,res)=>{
	let respuesta = validarTokenCompleto(req, res);

	if (!respuesta.tokenValido) {
		console.log(" ((((( Token invalido  )))))");
		return req.status(respuesta.status).send(respuesta);
	} else {
		console.log(" PASA EL TOKEN ");
		uploadCloudinary.uploadImagenPerfil(req,res);		
	}
});
//--- TAREAS PROGRAMADAS ------
schedule.scheduleJob('0 */33 * * * 1-5', function () {
	console.log('PROCESO DE REVISION DE SALIDA DE ALUMNOS ' + new Date());
	try {
		//tareas_programadas.ejecutarProcesoNotificacionProximaSalidaAlumno();
	} catch (e) {
		console.log("Error al ejecutar el proceso de revision de salida " + e);
	}
});



schedule.scheduleJob('0 */35 * * * 1-5', function () {
	//schedule.scheduleJob('0 */2 * * * 1-5', function () {	
	console.log('PROCESO DE REVISION DE EXPIRACION DE TIEMPO DE ALUMNOS ' + new Date());
	//FIXME : para pruebas
	try {
		//		tareas_programadas.ejecutarProcesoNotificacionExpiracionTiempoAlumno();
	} catch (e) {
		console.log("Error al ejecutar el proceso de revision de expiración " + e);
	}
});


// Sec,Min,Hor,D,M,Y
// correr a las 00:01 am cada 1 de cada mes
schedule.scheduleJob('0 1 0 1 * *', function () {
	console.log('Agregar cargo de mensualidad automatico' + new Date());
	//tareasProgramadas.ejecutarRegistroMensualidadAutomatica();
});

// correr a las 7 am cada 1 de cada mes
schedule.scheduleJob('0 0 7 1 * *', function () {
	console.log('Agregar cargo de mensualidad ' + new Date());
	//tareasProgramadas.ejecutarRegistroMensualidadAutomatica();
});

//correr a las 7:30 am cada 1 de cada mes
schedule.scheduleJob('0 30 7 1 * *', function () {
	console.log('Agregar cargo de mensualidad ' + new Date());
	//tareasProgramadas.ejecutarRegistroMensualidadAutomatica();
});

//correr a las 8:01 am cada 1 de cada mes
schedule.scheduleJob('0 1 8 1 * *', function () {
	console.log('Agregar cargo de mensualidad ' + new Date());
	//tareas.generarBalanceAlumnos();
});

/********* Calcular Recargos de mensualidades *********/
schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
	console.log('Agregar recargos de mensualidad ' + new Date());
	try {
		//recargoService.procesoRecargosMensualidad();
	} catch (error) {
		console.error("[index] Error al ejecutar el proceso de recargos " + error);

	}
});

schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
	console.log("TESTING HOUR "+new Date());
});
/********* Calcular Recargos de mensualidades *********/

///Enviar reportes de recargos
schedule.scheduleJob({ hour: 8, minute: 0, second: 0 }, function () {
	console.log('Enviando reporte y recordatorios  de recargos de mensualidad ' + new Date());
	try {
		//recargoService.ejecutarEnvioRecordatorioPagoMensualidadPadres();

	} catch (error) {
		console.error("[index] Error al ejecutar el proceso de recargos " + error);
	}

});

/*
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 20;
rule.minute = 0;*/
schedule.scheduleJob({ hour: 20, minute: 0 }, function () {
	console.log('PROCESO DE SALIDA ALUMNOS ' + new Date());
	try {
		//asistencia.ejecutarProcesoSalidaAutomatica();
	} catch (e) {
		console.log("Error al ejecutar el proceso de revision de salida " + e);
	}
});

console.log("Fin");
