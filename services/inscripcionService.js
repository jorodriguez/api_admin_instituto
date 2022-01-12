const inscripcionDao = require('../dao/inscripcionDao');
const alumnoDao = require('../dao/alumnoDao');
const cargoService = require('../services/cargoService');
const cursoDao = require('../dao/cursoDao');

const guardarInscripcion = async(inscripcionData)=>{

    const alumnoData = { co_sucursal,cat_genero,nombre,apellidos,direccion,telefono,fecha_nacimiento,nota,foto,co_empresa,genero} = inscripcionData;
    const inscripcion= { co_curso,co_empresa,co_sucursal,costo_colegiatura,costo_inscripcion,nota,genero} = inscripcionData;
    //co_empresa,co_sucursal,co_curso,cat_genero,nombre,apellidos,direccion,telefono,fecha_nacimiento,nota,costo_colegiatura,costo_inscripcion,genero
    
    const idAlumno = await alumnoDao.guardarAlumno(alumnoData);
    console.log("======== infoAlumno "+idAlumno);
    const idInscripcion = await inscripcionDao.guardarInscripcion(idAlumno,inscripcion);
    await  cargoService.registrarInscripcion(co_curso,idAlumno,genero);
    const alumno = await alumnoDao.getAlumnoPorId(idAlumno);
    
    //Enviar un correo
    return alumno;
}

const confirmarInscripcion = async (idInscripcion,inscripcionData)=>{    
    
    //const data = {confirmacion,nota,genero}=inscripcionData;

    const id = await inscripcionDao.confirmarInscripcion(idInscripcion,inscripcionData);
    //Aqui agregar los cargos de inicio

    return id;
}


const generarInscripcionesAutomaticamente = async ()=>{    
    console.log("@generarInscripcionesAutomaticamente");
    try{
        
        const SUPER_USUAURIO=1;
        let arrayResponse = [];

        const cursosInicianHoy = await cursoDao.getCursosInicianHoy();
        
        if(cursosInicianHoy || cursosInicianHoy.lenght == 0){
            console.log("############ no inicia nungun curso hoy ##########");
            return;
        }

        console.log("Iniciando el proceso de generacion de inscripciones ");
        for (const curso of cursosInicianHoy) {        

        console.log("-- iniciando las inscripciones del curso "+curso.especialidad);   

        const inscripcionesAutomaticas = await inscripcionDao.getIncripcionesCursoIniciaHoy(curso.id);

        if(inscripcionesAutomaticas && inscripcionesAutomaticas.lenght > 0){

            for (const element of inscripcionesAutomaticas) {           
                               
                await cargoService.registrarInscripcion(curso.id,element.id_alumno,SUPER_USUAURIO);                
            }
        }else{
            console.log("No existieron inscripciones confirmadas")
        }
    }
    console.log("=========== TERMINO EL PROCESO DE INSCRIPCIONES ?¿============");
    return arrayResponse;

    }catch(e){
        console.log("Error al generar los cargos de inscripcion "+e);
        return [];
    }
}


module.exports = {      
    guardarInscripcion,
    confirmarInscripcion,
    generarInscripcionesAutomaticamente,
    getInscripciones: inscripcionDao.getInscripciones,
    getInscripcionesSucursalCurso: inscripcionDao.getInscripcionesSucursalCurso,
    getInscripcionesAlumno:inscripcionDao.getInscripcionesAlumno,
    getInscripcionesActivasAlumno:inscripcionDao.getInscripcionesActivasAlumno,
    getInscripcionesCurso:inscripcionDao.getInscripcionesCurso
};