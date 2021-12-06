const Joi = require('joi');

module.export = validarSchemaInscripcion = async(request,response,next)=>{
    console.log("@validarSchemaInscripcion ");
    try{         
        const body = request.body;
        await schemaInscripcion.validateAsync(body);
        next();
        console.log("NEXT");
    }catch(e){
        console.log("VALIDACION ERROR "+e);

        handle.callbackError(e, response);
    }
}

const schemaInscripcion = 
    Joi.object({
    co_empresa:Joi.number().required(),
    co_sucursal:Joi.number().required(),
    co_curso:Joi.number().required(),
    cat_genero:Joi.number().required(),
    nombre:Joi.string().required(),
    apellidos:Joi.string().required(),
    direccion:Joi.string(),
    telefono:Joi.string().required(),
    fecha_nacimiento:Joi.date().required(),    
    nota:Joi.string(),
    costo_colegiatura:Joi.number().positive().required(),
    costo_inscripcion:Joi.number().positive().required(),
    genero:Joi.number().required(),
});