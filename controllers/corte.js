const moment = require('moment');
const corteService = require('../services/corteService');
const handle = require('../helpers/handlersErrors');
const notificacionService = require('../utils/NotificacionService');

const getCorteDiaSucursal = async (request, response) => {
    console.log("@getCorteDiaSucursal");
    try {

        const id_sucursal = request.params.id_sucursal;
        
        const {fecha} = request.body;        
        
        console.log("-----------"+JSON.stringify(request.body));
               
        
        if (!id_sucursal || !fecha ) {
            handle.callbackError("parametros incompletos", response);
            return;
        }

        const _fecha = moment(fecha).format('YYYY-MM-DD');
        
        console.log("fecha format "+_fecha);

        const results = await corteService.getCorteDiaSucursal({idSucursal:id_sucursal,fecha:_fecha});
        
        response.status(200).json(results);

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getCorteDiaSucursal
};