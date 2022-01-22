
const pagoService = require('../services/pagoService');
const alumnoService = require('../services/alumnoService');
const handle = require('../helpers/handlersErrors');
const notificacionService = require('../utils/NotificacionService');

const registrarPago = async (request, response) => {
    console.log("@registrarPago");
    try {
        //const pagoData = { id_alumno, pago, nota, ids_cargos, cargos_desglosados, cat_forma_pago, identificador_factura, genero } = request.body;
        //const pagoData = { id_alumno, pago, nota, ids_cargos, cargos_desglosados, cat_forma_pago, identificador_factura, genero } = request.body;
        const pagoData =
            {
                uid_alumno,
                pago,
                nota,
                ids_cargos,
                cargos_desglosados,
                ids_cargos_descuento,
                id_descuentos_desglose,
                cat_forma_pago,
                identificador_factura,
                identificador_pago,
                id_sucursal,
                genero
            } = request.body;

                    
        const alumno = await alumnoService.getAlumnoPorUId(uid_alumno);

        console.log("v "+JSON.stringify(pagoData));

        const result = await pagoService.registrarPago({id_alumno:alumno.id,...pagoData});
        
        response.status(200).json(result);
/*        pagoService
            .registrarPago(pagoData)
            .then(results => {
                //notificacionService.notificarReciboPago(id_alumno, results.agregar_pago_alumno,false);                
                response.status(200).json(results);
            }).catch(error => {
                console.log("No se guardo el pago " + error);
                handle.callbackError(error, response);
            });
            */

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


const reenviarComprobantePago = (request, response) => {
    console.log("@reenviar comprobante de Pago");
    try {
        const pagoData =
            {
                id_alumno,
                id_pago
            } = request.body;

        notificacionService
            .notificarReciboPago(id_alumno, id_pago,true)
            .then(result => {
                response.status(200).json(result);
            }).catch(error => {
                console.log("No se guardo el pago " + error);
                response.status(200).json(error);
               // handle.callbackError(error, response);
            });

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};

const getPagosByCargoId = (request, response) => {
    console.log("@getPagosByCargoId");
    try {

        const id_cargo_balance_alumno = request.params.id_cargo_balance_alumno;

        pagoService
            .getPagosByCargoId(id_cargo_balance_alumno)
            .then(results => {
                response.status(200).json(results);
            }).catch(error => {
                handle.callbackError(error, response);
            });
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};




const imprimirComprobantePago = async (request, response) => {
    console.log("@imprimirComprobantePago");
    try {
        
        const {id_pago,id_usuario } = request.params;

        const html = await pagoService.obtenerPreviewComprobantePago(id_pago,id_usuario);

        response.status(200).send(html);

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};

module.exports = {
    registrarPago,
    getPagosByCargoId,
    reenviarComprobantePago,
    imprimirComprobantePago
};