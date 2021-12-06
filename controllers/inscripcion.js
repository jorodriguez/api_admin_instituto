
const inscripcionService = require('../services/inscripcionService');

const guardarInscripcion = async (request, response) => {
    console.log("@guardarInscripcion");
    try {
       
            const inscripcionData = 
                            {co_empresa,co_sucursal,co_curso,cat_genero,nombre,apellidos,direccion,telefono,fecha_nacimiento,nota,costo_colegiatura,costo_inscripcion,genero}
                             = request.body;

            const results = await inscripcionService.guardarInscripcion(inscripcionData);
            
            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

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
        guardarInscripcion,
        getInscripciones 
};