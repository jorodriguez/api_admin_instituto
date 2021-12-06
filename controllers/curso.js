
const handle = require('../helpers/handlersErrors');

const cursoService = require('../services/cursoService');

const getCursosActivos = async (request, response) => {
    console.log("@getCursosActivos");
    try {
        
        const { id_sucursal,id_especialidad } = request.params;
        console.log(" id_sucursal,id_especialidad",id_sucursal+"  "+id_especialidad);
        const results = await cursoService.getCursosActivos(id_sucursal,id_especialidad)
        console.log("==> "+JSON.stringify(results));
        response.status(200).json(results);       
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getCursosActivos
};