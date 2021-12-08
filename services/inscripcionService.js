const inscripcionDao = require('../dao/inscripcionDao');
const alumnoDao = require('../dao/alumnoDao');

const guardarInscripcion = async(inscripcionData)=>{

    const alumnoData = { co_sucursal,cat_genero,nombre,apellidos,direccion,telefono,fecha_nacimiento,nota,foto,co_empresa,genero} = inscripcionData;
    const inscripcion= { co_curso,co_empresa,co_sucursal,costo_colegiatura,costo_inscripcion,nota,genero} = inscripcionData;
    //co_empresa,co_sucursal,co_curso,cat_genero,nombre,apellidos,direccion,telefono,fecha_nacimiento,nota,costo_colegiatura,costo_inscripcion,genero
    
    const idAlumno = await alumnoDao.guardarAlumno(alumnoData);
    console.log("======== infoAlumno "+idAlumno);
    const idInscripcion = await inscripcionDao.guardarInscripcion(idAlumno,inscripcion);
    const alumno = await alumnoDao.getAlumnoPorId(idAlumno);

    //Enviar un correo
    return alumno;
}


module.exports = {      
    guardarInscripcion,
    getInscripciones: inscripcionDao.getInscripciones,
    getInscripcionesAlumno:inscripcionDao.getInscripcionesAlumno
};