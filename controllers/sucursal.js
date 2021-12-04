
const handle = require('../helpers/handlersErrors');
const sucursalService = require('../services/sucursalService');

const getSucursalPorEmpresa = async (request, response) => {
    console.log("@getSucursalPorEmpresa");
    try {
        
        const {id_empresa} = request.params;
        
        const results = await sucursalService.getSucursalPorEmpresa(id_empresa);
        
        response.status(200).json(results);        
       
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getSucursalPorEmpresa
};