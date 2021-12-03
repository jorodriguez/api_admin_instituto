
const handle = require('../helpers/handlersErrors');

const cursoService = require('../services/cursoService');

const getCursosActivos = async (request, response) => {
    console.log("@getCursosActivos");
    try {
        
        const { id_sucursal,id_especialidad } = request.params;

        const results = await cursoService.getCursosActivos(id_sucursal,id_especialidad)
        
        response.status(200).json(results);       
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getCursosActivos
};