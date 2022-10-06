const reportesDashboardDao = require('../dao/reportesDashboardDao');
const cursoDao = require('../dao/cursoDao');
const templateService = require('./templateService');
const { TIPO_TEMPLATE } = require('../utils/Constantes');

const getDashboardContadores = async (data = {coEmpresa,coSucusal}) => {
    
    console.log("@getDashboardContadores");
       
    const contadores = await reportesDashboardDao.getContadores(data);
   

    return contadores;
};



module.exports = { 
       getDashboardContadores
};