
const inscripcionService = require('../services/inscripcionService');


const getInscripciones = async (request, response) => {
    console.log("@getInscripciones");
    try {
       
            const id_sucursal = parseInt(request.params.id_sucursal);            

            const results = await inscripcionService.getInscripciones(id_sucursal);
            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

module.exports = {
          getInscripciones 
};