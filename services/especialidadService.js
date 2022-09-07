const especialidadDao = require('../dao/especialidadDao');

module.exports = {          
    getEspecialidad    :especialidadDao.getEspecialidad,
    createEspecialidad :especialidadDao.createEspecialidad,
    updateEspecialidad :especialidadDao.updateEspecialidad,
    deleteEspecialidad :especialidadDao.deleteEspecialidad
};