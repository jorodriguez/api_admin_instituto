
const handle = require('../helpers/handlersErrors');

const cursoService = require('../services/cursoService');
const cursoSemanasService = require('../services/cursoSemanasService');




const getSemanasColegiaturasParaCargo = async (request,response) =>{

    console.log("@getSemanasColegiaturasParaCargo");  
    
    try {

        const { uidCurso,idAlumno } = request.params;

        console.log("iudCurso "+uidCurso);
        console.log("iudCurso "+idAlumno);
        
        let results = [];       

        results = await cursoSemanasService.getSemanasColegiaturasParaCargo(uidCurso,idAlumno);

        response.status(200).json(results);

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    } 
};


module.exports = {
    getSemanasColegiaturasParaCargo
};