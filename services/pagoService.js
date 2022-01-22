

const pagoDao = require('../dao/pagoDao');
const templateService = require('./templateService');
const {TIPO_TEMPLATE} = require('../utils/Constantes');
const obtenerPreviewComprobantePago = async (idPago,idUsuario)=>{
    
    const params = await pagoDao.getInfoPagoId(idPago);  

    console.log(JSON.stringify(params));
            
     const html = await  templateService
                            .loadTemplateEmpresa({
                                    params,
                                    idEmpresa:params.co_empresa,
                                    idUsuario,
                                    tipoTemplate:TIPO_TEMPLATE.RECIBO_PAGO
                                });
    
     return html;
};



module.exports = {
    obtenerPreviewComprobantePago,
    ...pagoDao
};

