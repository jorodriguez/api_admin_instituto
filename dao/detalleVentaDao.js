const genericDao = require('./genericDao');
//const Tables = require('../utils/Tables');
//const {ID_TIPO_MOVIMIENTO_VENTA} = require('../utils/TipoMovimientoArticulo');
//const Dao = require('./Dao');
//const ventaDao = new Dao(Tables.VE_VENTA); 

//const ventaDetalleDao = new Dao(Tables.VE_VENTA_DETALLE); 

//const VeVentaDetalle = require('../models/VeVentaDetalle');


//getDetalleTicket
const getListaDetalleVenta =async (idVenta)=>{
    return await genericDao.findOne(`
    select det.id,
    det.cantidad,
    det.precio,
    det.importe,
    art.nombre as articulo,
    art.codigo,
    det.ve_venta
from ve_venta_detalle det inner join cat_articulo_sucursal ars on det.cat_articulo_sucursal = ars.id
                   inner join cat_articulo art on art.id = ars.cat_articulo
    where det.ve_venta = $1
    `,[idVenta]);
}



module.exports = {
    getListaDetalleVenta
};