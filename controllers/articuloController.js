
const handle = require('../helpers/handlersErrors');
const articuloService = require('../services/articuloService');

const getArticuloCodigo = async (request, response) => {
    console.log("@getArticuloCodigo");
    try {
       
            const codigo = parseInt(request.params.codigo);
            const coSucursal = parseInt(request.params.coSucursal);
            console.log("Consultando codigo " + codigo);

            const results = await articuloService.getArticuloCodigo(coSucursal,codigo);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getArticuloPorNombre = async (request, response) => {
    console.log("@getArticuloPorNombre");
    try {
       
            const nombre = parseInt(request.params.nombre);
            const coSucursal = parseInt(request.params.coSucursal);
            console.log("Consultando nombre " + nombre);

            const results = await articuloService.getArticulosPorNombre(coSucursal,nombre);
                        
            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getArticuloCodigo,
    getArticuloPorNombre
};