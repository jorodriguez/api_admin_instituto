const app = require('./routes/app');

const multer = require('multer');
const fileUpload = multer();

//const alumno = require('./services/alumno');
const asistencia = require('./services/asistencia');
const authController = require('./auth/AuthController');
const actividad = require('./services/actividad');
const inscripcion = require('./services/inscripcion');
const familiar = require('./services/familiar');
const parentesco = require('./services/parentesco');
const formato_complemento = require('./services/formato_complemento');
const pagos = require('./services/pagos');
const cargos = require('./services/cargos');
const mensajeria = require('./services/mensajesFirebase');
const tareasProgramadas = require('./services/tareas_programadas');
const schedule = require('node-schedule');
const { configuracion } = require('./config/ambiente');
const reporteDeudas = require('./services/reporteDeudas');
const reporte_mensualidades = require('./services/reporte_mensualidades');
const utilerias = require('./services/utilerias');
const datos_facturacion = require('./services/datos_facturacion');
const gastos = require('./services/gastos');
const reporte_gastos = require('./services/reporteGastos');
const actividad_reporte = require('./services/actividad_reporte');
const authClientesController = require('./auth/AuthClientesController');
const sucursales = require('./services/sucursal');
const alumnoSucursal = require('./services/alumno_sucursal');
const usuarioService = require('./services/usuario');
const catagolos = require('./services/catalogos');
const conf = require('./services/configuracion');
const https = require("https");
const { validarTokenCompleto } = require('./helpers/helperToken');
const asistenciaUsuario = require('./services/asistencia_usuario');
const recargoService = require('./services/recargos');
const catalogoRecursos = require('./services/catalogo_recursos');
const reporteContabilidad = require('./services/reporteContabilidad');
const catalogoDescuento = require('./services/cat_descuento');
const uploadCloudinary = require('./services/uploadCloudinary');
const reporteAsistenciaUsuario = require('./services/reporte_asistencia_usuario');
const avisos = require('./services/avisos');
const grupo = require('./services/grupo');
const servicios = require('./services/servicios');

const checkAuth = require('./routes/check-auth');
const loginRoutes = require('./routes/login');
const alumnoRoute = require('./routes/alumno');
const asistenciaRoute = require('./routes/asistencia');
const asistenciaUsuariosRoute = require('./routes/asistenciaUsuarios');
const usuarioRhRoute = require('./routes/usuariosRh');

app.use('/auth',loginRoutes);
app.use('/alumnos',alumnoRoute);

//Cambio de sucursal
app.get('/sucursal_usuario/:id', authController.obtenerSucursalesUsuario);
app.put('/sucursal_usuario', authController.cambiarSucursalUsuario);

//alumno
/*
app.get('/alumnos/:id_sucursal',checkAuth, alumno.getAlumnos);
app.get('/alumnos/:id_sucursal/eliminados/:eliminado?',checkAuth, alumno.getAlumnos);
app.get('/alumnos/id/:id',checkAuth, alumno.getAlumnoById);
app.post('/alumnos',checkAuth, alumno.createAlumno);
app.put('/alumnos/:id', checkAuth,alumno.updateAlumno);
app.put('/alumnos/fecha_limite_pago/:id',checkAuth, alumno.modificarFechaLimitePagoMensualidad);
app.put('/alumnos/baja/:id',checkAuth, alumno.bajaAlumno);
app.put('/alumnos/activar/:id', checkAuth,alumno.activarAlumnoEliminado);

*/

//asistencia
app.use('/asistencia',asistenciaRoute);
/*app.get('/asistencia/alumnos_recibidos/:id_sucursal',checkAuth, asistencia.getAlumnosRecibidos);
app.get('/asistencia/alumnos_por_recibidos/:id_sucursal',checkAuth, asistencia.getAlumnosPorRecibir);
app.post('/asistencia/entradaAlumnos',checkAuth, asistencia.registrarEntradaAlumnos);
app.post('/asistencia/salidaAlumnos',checkAuth, asistencia.registrarSalidaAlumnos);
app.get('/asistencia/salidaAlumnos/alumno_tiempo_extra/:lista_id_asistencias',checkAuth, asistencia.getListaAsistenciaAlumnoPorSalirConHorasExtras);

// Reporte de asistencias
app.get('/asistencia/reporte/:id_sucursal/:fecha',checkAuth, asistencia.getListaAsistenciaPorSucursalFecha);
app.get('/asistencia/reporte_por_alumno/:id_alumno',checkAuth, asistencia.getListaAsistenciaMesPorAlumno);
app.get('/asistencia/reporte_mes_alumno/:id_alumno', checkAuth,asistencia.getListaMesAsistenciaPorAlumno);
app.get('/asistencia/reporte_mes_sucursal/:id_sucursal',checkAuth, asistencia.getListaMesAsistenciaPorSucursal);
app.get('/asistencia/mensual/:id_alumno',checkAuth, asistencia.getListaAsistenciaMesPorAlumno);
*/


//Asistencia Usuarios
app.use('/asistencia_usuarios',asistenciaUsuariosRoute);
/*
app.get('/asistencia_usuarios/por_entrar/:id_sucursal',checkAuth, asistenciaUsuario.getListaUsuarioPorEntrar);
app.get('/asistencia_usuarios/por_salir/:id_sucursal',checkAuth, asistenciaUsuario.getListaUsuarioPorSalir);
app.post('/asistencia_usuarios/entrada',checkAuth, asistenciaUsuario.registrarEntradaUsuario);
app.post('/asistencia_usuarios/salida',checkAuth, asistenciaUsuario.registrarSalidaUsuario);

app.get('/asistencia_usuarios/reporte_mes/:id_sucursal/:fecha_inicio/:fecha_fin',checkAuth, asistenciaUsuario.getListaFaltasUsuariosSucursalRangoFecha);
app.get('/asistencia_usuarios/usuario/:id_usuario/:fecha_inicio/:fecha_fin', checkAuth,asistenciaUsuario.getDetalleFaltasUsuariosRangoFecha);
//--filtros para usar en el reporte de sueldos
app.get('/asistencia_usuarios/filtros_anios/:co_empresa',checkAuth, asistenciaUsuario.getAniosFiltroAsistenciasUsuarios);
app.get('/asistencia_usuarios/filtros_quincenas/:co_empresa/:anio',checkAuth, asistenciaUsuario.getMesesFiltroAsistenciasUsuarios);
// reporte de asistencia de usuarios por rh
app.get('/asistencia_usuarios/reporte_rh/:id_sucursal/:fecha_inicio/:fecha_fin',checkAuth,reporteAsistenciaUsuario.getReporteAsistenciaUsuario);
*/

app.use('/usuarios_rh',usuarioRhRoute);
/*app.post('/usuarios_rh',usuarioService.desactivarUsuarioReporte);
app.get('/usuarios_rh/:id_sucursal',checkAuth,reporteAsistenciaUsuario.getUsuariosAsistencias);
*/

//grupo
app.get('/grupos/:id_empresa',checkAuth, grupo.getGruposPorEmpresa);

//actividades
app.get('/actividad/catalogo_actividad',checkAuth, actividad.getCatalogoActividades);
app.post('/actividad/registrar',checkAuth, actividad.registrarActividad);

//inscripcion
app.get('/inscripcion/:id_alumno', checkAuth,inscripcion.getFormatoInscripcion);
//app.post('/inscripcion/registrar', inscripcion.createFormatoInscripcion);
app.put('/inscripcion/:id',checkAuth, inscripcion.updateInscripcion);
app.delete('/inscripcion/:id', checkAuth,inscripcion.deleteFormatoInscripcion);

//familiar
app.get('/familiar/:id_alumno',checkAuth, familiar.getFamiliaresAlumno);
app.post('/familiar/:id_alumno',checkAuth, familiar.crearFamiliar);
app.put('/familiar/:id_familiar',checkAuth, familiar.modificarFamiliar);
app.put('/familiar/eliminar/:id_relacion',checkAuth, familiar.eliminarFamiliar);
app.get('/familiar/:id_parentesco/:apellidos_alumno/:id_sucursal',checkAuth, familiar.getFamiliareParaRelacionar);

//parentesco
app.get('/parentesco/:id_alumno',checkAuth, parentesco.getCatalogoParentescoAlumno);

//genero
app.get('/genero_familiar',checkAuth, catagolos.getCatGeneroFamiliar);
app.get('/genero_alumno', checkAuth,catagolos.getCatGeneroAlumno);

//servicios
app.get('/servicios/:id_empresa',checkAuth, servicios.getServiciosPorEmpresa);

//complementos del formato de inscripcion
app.get('/valores_esperados/:id_formato',checkAuth, formato_complemento.getCatalogoValoresEsperados);

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

// descuentos - catalogo
app.get('/descuento/:id_empresa',checkAuth, catalogoDescuento.getDescuentos);

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

//Datos de facturacion
app.post('/datos_facturacion',checkAuth, datos_facturacion.guardarDatosFacturacionAlumno);
app.put('/datos_facturacion',checkAuth, datos_facturacion.actualizarRequiereFacturacionAlumno);

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
app.get('/actividades/:id_familiar', actividad_reporte.getActividadesRelacionadosFamiliar);
app.post('/auth_cliente/login', authClientesController.loginCliente);
app.put('/auth_cliente/:id_familiar', authClientesController.cambioClaveFamiliar);
app.get('/balance_familiar_alumno/:id_familiar', actividad_reporte.getBalanceFamiliarAlumnos);

//catalogo de recursos
app.get('/recurso_familiar/:id_familiar', catalogoRecursos.getAlumnosPorFamiliar);
app.get('/recurso_grupo/:id_grupo/:id_sucursal', catalogoRecursos.getRecursosPorGrupo);

app.post('/emocion', actividad_reporte.registrarToqueEmocion);

// modificar token de cliente
app.post('/cliente/:id_familiar', actividad_reporte.updateTokenMensajeriaFamiliar);
app.put('/cliente/:id_familiar', actividad_reporte.updateDatosFamiliar);
//------------------------------------------------

//reset password
app.get('/reset_password/:id_familiar',checkAuth, familiar.resetPasswordFamiliar);


//reporte de mensualidades facturadas
app.get('/sucursal_usuario/sucursales_asignadas/:id_usuario',checkAuth, usuarioService.getSucursalesUsuario);
app.get('/reporte_mensualidades/:id_sucursal/:anio',checkAuth, reporte_mensualidades.getMensualidadesAlumnosSucursal);
app.get('/cargos/filtro_anios/:id_sucursal', checkAuth,cargos.obtenerFiltroAniosCargosSucursal);

app.get('/reporte_mensualidades_mes_actual/:id_usuario', checkAuth,reporte_mensualidades.getReporteContadoresSucursalesMesActual);
app.get('/reporte_mensualidades/:id_sucursal/:id_usuario', checkAuth,reporte_mensualidades.getReporteContadoresMesesPorSucursal);
app.get('/reporte_mensualidades/:id_sucursal/:mes', checkAuth,reporte_mensualidades.getReporteMensualidadesPorSucursalMes);

//configuracion
app.get('/configuracion',checkAuth, conf.getConfiguracion);

//Mensajes
//app.get('/mensaje', mensajeria.sendMessage);

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
