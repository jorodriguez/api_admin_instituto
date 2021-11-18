
const handle = require('../helpers/handlersErrors');
const servicioService = require('../domain/servicioService');

const getServiciosPorEmpresa = async (request, response) => {
    console.log("@getServiciosPorEmpresa");
    try {
        
        const {id_empresa} = request.params;
        
        const results = await servicioService.getServiciosPorEmpresa(id_empresa);
        
        response.status(200).json(results);        
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

module.exports = {
    getServiciosPorEmpresa
};