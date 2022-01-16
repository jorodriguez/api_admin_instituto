
const corteService = require('../services/corteService');
const handle = require('../helpers/handlersErrors');
const notificacionService = require('../utils/NotificacionService');

const getCorteDiaSucursal = async (request, response) => {
    console.log("@getCorteDiaSucursal");
    try {

        const id_sucursal = request.params.id_sucursal;

        const results = await corteService.getCorteDiaSucursal(id_sucursal);
        
        response.status(200).json(results);

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getCorteDiaSucursal
};