
const handle = require('../helpers/handlersErrors');
const catMarcaService = require('../services/c');

const getAll = async (request, response) => {
    console.log("@getAllCategoria");
    try {
                   
            const coEmpresa = parseInt(request.params.coEmpresa);
            
            const results = await catMarcaService.getAll(coEmpresa);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


const createMarca = async (request, response) => {
    console.log("@createMarca");
    try {
                  
            const data = request.body;
            
            const results = await catMarcaService.createMarca(data);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    createMarca,
    getAll
};