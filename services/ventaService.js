const ventaDao = require('../dao/ventaDao');
const detalleVentaDao = require('../dao/detalleVentaDao');
const templateService = require('./templateService');
const {TIPO_TEMPLATE} = require('../utils/Constantes');

const getTicketData = async(idVenta)=>{
    
    const ventaRow = await ventaDao.getVentaById(idVenta);
    
    if(!ventaRow){
            console.log("No existe la venta");
            return null;
    }

    const detalleVenta = await detalleVentaDao.getListaDetalleVenta(idVenta);
    
   return {venta:ventaRow,detalle:detalleVenta};

}

const getHtmlTicket = async (idVenta)=>{
    console.log("@getHtmlTicket");
    
    const ticketData = await getTicketData(idVenta);

    const {venta,detalle} = ticketData;

    console.log("--"+JSON.stringify(ticketData));

    const params = {
        ...venta,
        detalle:detalle,
        nombre_sucursal:venta.nombre_sucursal,
        direccion_sucursal:venta.direccion_sucursal,
        telefono_sucursal:venta.telefono_sucursal
   };

   const html = await  templateService
   .loadTemplateEmpresa({
           params,
           idEmpresa: venta.co_empresa,
           idUsuario:venta.genero,
           tipoTemplate:TIPO_TEMPLATE.TICKET_VENTA
    });

    console.log(`html Corte ${html}`);
      
    return html;
};



module.exports = { 
                    getHtmlTicket,
                    createVenta:ventaDao.createVenta,
                    getVentasSucursal: ventaDao.getVentasSucursal
                 };
