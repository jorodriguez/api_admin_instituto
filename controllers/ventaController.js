
const handle = require('../helpers/handlersErrors');
const ventaService = require('../services/ventaService');

const createVenta = async (request, response) => {
    console.log("@createVenta");
    try {
       
            //venta,detalleVenta,co_empresa,co_sucursal,genero

            const data =  {venta,detalleVenta,co_empresa,co_sucursal,genero} = request.body;            

            if(!venta || !detalleVenta || !co_empresa || !co_sucursal || !genero){
                console.log(`venta ${!venta} detalleVenta ${!detalleVenta} co_empresa ${!co_empresa} co_sucursal ${!co_sucursal} genero ${!genero}`);
                handle.callbackError("error de validación",response);
                return;
            }
                   
            const results = await ventaService.createVenta(data);

            console.log("Venta "+JSON.stringify(results));

            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

// getTicket


module.exports = {
    createVenta
};