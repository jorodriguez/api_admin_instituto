const genericDao = require('./genericDao');

const getEmpresaId = async (idEmpresa) => {
    console.log("@getEmpresaId");
    return await genericDao.findOne(
    `select * from co_empresa where id = $1 and eliminado = false and activa = true `, [idEmpresa]);
};


module.exports = {
    getEmpresaId
};