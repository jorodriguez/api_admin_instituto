
const handle = require('../helpers/handlersErrors');
const siUsuarioSucursalRolService = require('../services/siUsuarioSucursalRolService');

const getAllRolesUsuario = async (request, response) => {
    console.log("@siUsuarioSucursalRolService");
    try {                   

        console.log(JSON.stringify(request.params))
        
            const idUsuario = parseInt(request.params.idUsuario);
            
            const idSucursal = parseInt(request.params.idSucursal);
            
            const results = await siUsuarioSucursalRolService.getAllRolesUsuario(idUsuario,idSucursal);

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


const cambiarEstadoRol = async (request, response) => {
    console.log("@cambiarEstadoRol");
    try {                   
            const data = { idRol,idUsuario,idSucursal,idEmpresa } = request.body;
             const idUsuarioGenero = request.params.idUsuarioGenero;
                          
             const results = await siUsuarioSucursalRolService.actualizarRol({idUsuarioGenero,...data});

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {    
    getAllRolesUsuario,
    cambiarEstadoRol
};