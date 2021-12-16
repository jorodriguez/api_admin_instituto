const router = require('express').Router();
const schedule = require('node-schedule');

const alumno = require('../controllers/alumno');

//---------------------------
// Tareas automatizadas 
//---------------------------

// Sec,Min,Hor,D,M,Y
// Crear los cargos de las semanas de los alumnos corre todos los días a las 8 am
schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
	console.log('AGREGAR CARGOS AUTOMATICOS' + new Date());
	try {
		//
	} catch (error) {
		console.error("ERROR EN EL PROCESO AUTOMATICO DE GENERACION DE CARGOS  " + error);

	}
});


//INICIAR UN CURSO - GENERAR TODOS LOS CARGOS Y CAMBIAR A ACTIVO INICIADO EL REGISTRO DE CURSO
schedule.scheduleJob("INICIAR_CURSO_AUTOMATICO",{ hour: 0 , minute:1, second: 0 }, function () {
	console.log('INICIAR EL CURSO AUTOMATICAMENTE ' + new Date());
	try {
		//
	} catch (error) {
		console.error("ERROR EN EL PROCESO AUTOMATICO DE INICIAR EL CURSO AUTOMATICAMENTE  " + error);

	}
});

schedule.scheduleJob({ hour: 8 , minute:0, second: 0 }, function () {
	console.log("TESTING HOUR "+new Date());
});


// TEST PING CADA 30 MINUTOS DE LUNES A VIERNESS¿
schedule.scheduleJob("SH_PING",'0 */30 * * * 1-5', function () {
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