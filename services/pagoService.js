

const pagoDao = require('../dao/pagoDao');
const templateService = require('./templateService');

const obtenerPreviewComprobantePago = async (idPago)=>{
    
    const params = await pagoDao.getInfoPagoId(idPago);  

    console.log(JSON.stringify(params));
            
     const html = await  templateService.loadTemplateReciboPago(params,params.co_empresa);
    
     return html;
};



module.exports = {
    obtenerPreviewComprobantePago,
    ...pagoDao
};

