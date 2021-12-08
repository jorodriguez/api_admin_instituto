const cursoDao = require('../dao/cursoDao');
module.exports = {      
        createCurso: cursoDao.createCurso,
        getCursosActivos: cursoDao.getCursosActivos,
        getCursosActivoSucursal: cursoDao.getCursosActivoSucursal
};