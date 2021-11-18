const genericDao = require('./genericDao');

const getServicioPorEmpresa = async (idEmpresa) => {
    console.log("@getServicioPorEmpresa");
    return await genericDao.findAll("SELECT * from CAT_SERVICIO where co_empresa = $1 and eliminado = false order by nombre", [idEmpresa]);

};


module.exports = {
    getServicioPorEmpresa
};