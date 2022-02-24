const ventaDao = require('../dao/ventaDao');
const detalleVentaDao = require('../dao/detalleVentaDao');
const templateService = require('./templateService');
const {TIPO_TEMPLATE} = require('../utils/Constantes');

const getTicketData = async(idVenta)=>{
    
    const ventaRow = ventaDao.getVentaById(idVenta);
    
    if(!venta){
            console.log("No existe la venta");
            return null;
    }

    const detalleVenta = detalleVentaDao.getListaDetalleVenta(idVenta);
    
   return {venta:ventaRow,detalleVenta};

}

const getHtmlTicket = async (idVenta)=>{
    console.log("@getHtmlTicket");
    
    const ventaData = await getTicketData(idVenta);

    const params = {
        
        nombre_sucursal:ventaData.nombre_sucursal,
        direccion_sucursal:ventaData.direccion_sucursal,
        telefono_sucursal:ventaData.telefono_sucursal
   };

   const html = await  templateService
   .loadTemplateEmpresa({
           params,
           idEmpresa: ventaData.co_empresa,
           idUsuario,
           tipoTemplate:TIPO_TEMPLATE.TICKET_VENTA
    });

    console.log(`html Corte ${html}`);
      
    return html;
};

module.exports = { 
                    getTicketData
                 };
