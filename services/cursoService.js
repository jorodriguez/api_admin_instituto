const cursoDao = require('../dao/cursoDao');
module.exports = {      
        createCurso: cursoDao.createCurso,
        updateCurso: cursoDao.updateCurso,
        eliminarCurso: cursoDao.eliminarCurso,
        getCursosActivos: cursoDao.getCursosActivos,
        getCursosActivoSucursal: cursoDao.getCursosActivoSucursal
};