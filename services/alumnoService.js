const alumnoDao = require('../dao/alumnoDao');

function getCorreosTokenAlumno(idAlumno) {
    console.log("@getCorreosTokenAlumno");
    return  alumnoDao.getCorreosTokensAlumno(idAlumno);    
}

const getAlumnos = (idSucursal)=>{
    return alumnoDao.getAlumnos(idSucursal);
}


module.exports = { 
                    getAlumnos,
                    modificarAlumno:alumnoDao.modificarAlumno,
                    getCorreosTokenAlumno,                    
                    bajaAlumno:alumnoDao.bajaAlumno,
                    activarAlumnoEliminado:alumnoDao.activarAlumnoEliminado,
                    getAlumnoPorUId:alumnoDao.getAlumnoPorUId,
                    
                 };
