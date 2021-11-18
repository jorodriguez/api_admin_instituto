
const handle = require('../helpers/handlersErrors');

const grupoService = require('../domain/grupoService');


const registrarGrupo = async (request, response) => {
    console.log("@registrarGrupo");
    try {

        const grupoData = {nombre,color, co_empresa, genero} = request.body;

        let results = await grupoService.registrarGrupo(grupoData);        
        
        response.status(200).json(results);        

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};


const modificarGrupo = async (request, response) => {
    console.log("@modificarGrupo");
    try {
     
        const grupoData = {nombre,color, genero} = request.body;

        const results = await grupoService.modificarGasto(grupoData)
        
         response.status(200).json(results);        
       
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);

    }
};


const eliminarGrupo = async (request, response) => {
    console.log("@eliminarGrupo");
    try {
        const id = request.params.id;
        
        const { genero } = request.body;

        const results = await grupoService.eliminarGasto(id,genero)
        
        response.status(200).json(results);        
       
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);

    }
};

const getGruposPorEmpresa = async (request, response) => {
    console.log("@getGruposPorEmpresa");
    try {
        
        const {id_empresa} = request.params;
        
        const results = await grupoService.getGruposPorEmpresa(id_empresa);
        
        response.status(200).json(results);        
       
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};

module.exports = {
  registrarGrupo,
  modificarGrupo,
  eliminarGrupo,
  getGruposPorEmpresa
};