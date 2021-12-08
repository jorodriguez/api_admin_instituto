
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

const getCursosActivosSucursal = async (request, response) => {
    console.log("@getCursosActivosSucursal");
    try {
        
        const { id } = request.params;
        console.log(" id_sucursal",id);
        const results = await cursoService.getCursosActivoSucursal(id);
        console.log("==> "+JSON.stringify(results));
        response.status(200).json(results);       
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const createCurso = async (request, response) => {
    console.log("@createCurso");
    try {
        
        const cursoData = {  
            cat_especialidad,
            dias,
            cat_horario,
            co_empresa,
            co_sucursal,
            costo_colegiatura_base,
            costo_inscripcion_base,
            nota,
            fecha_inicio_previsto,
            fecha_fin_previsto,      
            genero } = request.body;
        
        const results = await cursoService.createCurso(cursoData);

        console.log("==> "+JSON.stringify(results));

        response.status(200).json(results);       
       
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    createCurso,
    getCursosActivos,
    getCursosActivosSucursal
};