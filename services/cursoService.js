const cursoDao = require('../dao/cursoDao');
const inscripcionDao = require('../dao/inscripcionDao');
const cargoService = require('../services/cargoService');
const CONSTANTES = require('../utils/Constantes');


const iniciarCurso = async (uidCurso,genero) => {
        console.log("@IniciarCurso "+uidCurso);
        try {

                const inscripcionesConfirmadas = await inscripcionDao.getInscripcionesConfirmadasCurso(uidCurso);
                
                console.log(`=>generar ${inscripcionesConfirmadas.length} inscripciones`);

                if (inscripcionesConfirmadas && inscripcionesConfirmadas.length > 0) {

                        //for (const element of inscripcionesConfirmadas) {
                        for(let i =0; i < inscripcionesConfirmadas.length; i++){
                                const element = inscripcionesConfirmadas[i];
                                console.log("==Iniciando Generacion de cargo INSCRIPCION  "+element.alumno);
                                await cargoService.registrarInscripcion(element.id_curso, element.id_alumno, genero);
                                console.log("Finalizando generacion de cargo para "+element.alumno);
                                
                                console.log("==Iniciando Generacion de COLEGIATURA "+element.alumno);
                                await cargoService.registrarColegiatura(element.id_curso,element.id_alumno, genero);

                        }

                        //Inciar curso
                        console.log("MARCANDO CURSO COMO INICIADO");
                        await cursoDao.marcarCursoComoIniciado(uidCurso,genero);

                } else {
                        console.log("No existieron inscripciones confirmadas")
                }
        } catch (e) {
                console.log("XX excepcion "+e);
                return false;
        }

}


module.exports = {
        iniciarCurso:iniciarCurso,
        createCurso: cursoDao.createCurso,
        updateCurso: cursoDao.updateCurso,
        eliminarCurso: cursoDao.eliminarCurso,
        getCursosActivos: cursoDao.getCursosActivos,
        getCursosActivoSucursal: cursoDao.getCursosActivoSucursal,
        getCursosInicianProximosDias: cursoDao.getCursosInicianProximosDias,
        getCursoByUid: cursoDao.getCursoByUid,
        getSeriesPeriodosCurso: cursoDao.getSeriesPeriodosCurso
};