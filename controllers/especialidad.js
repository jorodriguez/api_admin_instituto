
const handle = require('../helpers/handlersErrors');

const especialidadService = require('../services/especialidadService');

const getEspecialidad = async (request, response) => {
    console.log("@getEspecialidad");
    try {
        
        const { id_empresa,id_sucursal } = request.params;

        const results = await especialidadService.getEspecialidad(id_empresa,id_sucursal);
        
        response.status(200).json(results);       
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getEspecialidad
};