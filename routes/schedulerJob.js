const router = require('express').Router();
const schedule = require('node-schedule');
const cargoService = require('../services/cargoService');
const corteService = require('../services/corteService');
const empresaService = require('../services/empresaService');
//const inscripcionService = require('../services/inscripcionService');

//const inscripcionService = require('../services/inscripcionService');


//testing
router.get('/colegiaturas', async(request, response) => {
    console.log("@Colegiaturas");
    try {

        const listaCargosColegiaturas = await cargoService.registrarColegiaturaAlumnoSemanaActualAutomatico();

        //enviarcorreos
        console.log("---------- COLEGIATURAS GENERADAS ---------");
        console.log(JSON.stringify(listaCargosColegiaturas));
        response.status(200).json(listaCargosColegiaturas);

    } catch (e) {
        console.log("Error " + e);
        response.status(400).json({ error: e })
    }

});


//envio de corte dia
router.get('/x23/:id_empresa', async(request, response) => {
    console.log("@envio_corte");
    try {

        const { id_empresa } = request.params;

        console.log("EMPRESA = " + id_empresa);

        const infoEnvio = await corteService.enviarCorteEmpresaCorreo({ coEmpresa: id_empresa });

        response.status(200).json(infoEnvio);

    } catch (e) {
        console.log("Error " + e);
        response.status(400).json({ error: e })
    }

});


//---------------------------
// Tareas automatizadas 
//---------------------------

// Sec,Min,Hor,D,M,Y
// Crear los cargos de las semanas de los alumnos corre todos los días a las 8 am
//schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
schedule.scheduleJob("GENERAR_COLEGIATURAS_7_0_0", { hour: 7, minute: 0, second: 0 }, async function() {
    console.log('GENERAR COLEGIATURAS AUTOMATICAS' + new Date());
    try {
        //
        const listaCargosColegiaturas = await cargoService.registrarColegiaturaAlumnoSemanaActualAutomatico();
        //enviarcorreos
        console.log("---------- COLEGIATURAS GENERADAS ---------");
        console.log(JSON.stringify(listaCargosColegiaturas));

    } catch (error) {
        console.error("ERROR EN EL PROCESO AUTOMATICO DE GENERACION DE COLEGIATURAS  " + error);
    }
});


// Sec,Min,Hor,D,M,Y
// Crear los cargos de colegiatura mensuales 
//schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
//schedule.scheduleJob("GENERAR_COLEGIATURAS_7_0_5", { hour: 7, minute: 5, second: 0 }, async function() {

schedule.scheduleJob("GENERAR_COLEGIATURAS_7_0_5", { hour: 13, minute: 37, second: 0 }, async function() {
    console.log('GENERAR COLEGIATURAS MENSUALES AUTOMATICAS' + new Date());
    try {

        const listaCargosColegiaturas = await cargoService.registrarColegiaturaAlumnoMensualActualAutomatico();
        //enviarcorreos
        console.log("---------- COLEGIATURAS GENERADAS MENSUALES ---------");
        console.log(JSON.stringify(listaCargosColegiaturas));

    } catch (error) {
        console.error("ERROR EN EL PROCESO AUTOMATICO DE GENERACION DE COLEGIATURAS MENSUALES  " + error);
    }
});



schedule.scheduleJob("GENERAR_COLEGIATURAS_0_2_0", { hour: 0, minute: 2, second: 0 }, async function() {
    console.log('GENERAR COLEGIATURAS AUTOMATICAS' + new Date());
    try {
        //
        const listaCargosColegiaturas = await cargoService.registrarColegiaturaAlumnoSemanaActualAutomatico();
        //enviarcorreos
        console.log("---------- COLEGIATURAS GENERADAS ---------");
        console.log(JSON.stringify(listaCargosColegiaturas));

    } catch (error) {
        console.error("ERROR EN EL PROCESO AUTOMATICO DE GENERACION DE COLEGIATURAS  " + error);
    }
});


schedule.scheduleJob("CORTE_DIARIO_ENVIO_CORREO_6_30", { hour: 18, minute: 30, second: 0 }, async function() {
    console.log('ENVIAR CORTE POR CORREO AUTOMATICO' + new Date());
    try {


        const listaEmpresas = await empresaService.getCuentasEmpresa();

        for (let i = 0; i < listaEmpresas.length; i++) {

            const empresa = listaEmpresas[i];

            const infoEnvio = await corteService.enviarCorteEmpresaCorreo({ coEmpresa: empresa.id });

            console.log(`---------- FINALIZA EL ENVIO DE LA EMPRESA ${empresa.nombre} ---------`);
            console.log(JSON.stringify(infoEnvio));
        }

        console.log(`---------- TERMINA EL PROCESO  ---------`);

    } catch (error) {
        console.error("ERROR EN EL PROCESO  envio de correo del corte " + error);
    }
});

//INICIAR UN CURSO - GENERAR TODOS LOS CARGOS Y CAMBIAR A ACTIVO INICIADO EL REGISTRO DE CURSO
/*schedule.scheduleJob("INICIAR_CURSO_AUTOMATICO",{ hour: 0 , minute:1, second: 0 }, function () {
	console.log('INICIAR EL CURSO AUTOMATICAMENTE ' + new Date());
	try {
		//
	} catch (error) {
		console.error("ERROR EN EL PROCESO AUTOMATICO DE INICIAR EL CURSO AUTOMATICAMENTE  " + error);

	}
});*/

schedule.scheduleJob("TESTING_HOUR", { hour: 8, minute: 0, second: 0 }, function() {
    console.log("TESTING HOUR " + new Date());
});


// TEST PING CADA 30 MINUTOS DE LUNES A VIERNESS¿
schedule.scheduleJob("SH_PING", '0 */30 * * * 1-5', function() {
    console.log('TESTING PING ' + new Date());
    try {

    } catch (e) {
        console.log("ERROR EN TESTING PING " + e);
    }
});

console.log("=========================================");
console.log("===== TAREAS AUTOMATICAS REGISTRADAS ====");
console.log(schedule.scheduledJobs);
console.log("=========================================");

module.exports = router;