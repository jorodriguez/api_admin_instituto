
const handle = require('../helpers/handlersErrors');
const catUnidadMedidaService = require('../services/catUnidadMedidaService');

const getAll = async (request, response) => {
    console.log("@getAll");
    try {
                   
            const coEmpresa = parseInt(request.params.coEmpresa);
            
            const results = await catUnidadMedidaService.getAll(coEmpresa);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


const createUnidadMedida = async (request, response) => {
    console.log("@createUnidadMedida");
    try {
                  
            const data = request.body;
            
            const results = await catUnidadMedidaService.createMarca(data);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    createUnidadMedida,
    getAll
};