//const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const {ID_TIPO_MOVIMIENTO_VENTA} = require('../utils/TipoMovimientoArticulo');
const Dao = require('./Dao');
const ventaDao = new Dao(Tables.VE_VENTA); 
const ventaDetalleDao = new Dao(Tables.VE_VENTA_DETALLE); 
const movimientoArticuloDao = require('./movimientoArticuloDao');

const VeVenta = require('../models/VeVenta');
const VeVentaDetalle = require('../models/VeVentaDetalle');
const VeMovimiento  = require('../models/VeMovimiento');


const createVenta = async (data) => {
    console.log("@createVenta");

    try {
        const {venta,detalleVenta,co_empresa,co_sucursal,genero} = data;
        
        const ventaInsertData = Object.assign(new VeVenta(),venta);
       
        ventaInsertData.setCoEmpresa(co_empresa)
                        .setCoSucursal(co_sucursal)
                        .setGenero(genero);
    
        await ventaDao.getTransaction(async transactionActive =>{
            
            const rowVenta = await ventaDao.insert(ventaInsertData.build()).transacting(transactionActive);         

            //guardar detalle
            for(let i = 0; i < detalleVenta.lenght; i++){
                                              
                const detalleVenta = Object.assign(new VeVentaDetalle(),  detalleVenta[i]);

                const detalleVentaInsertData = detalleVenta.setVeVenta(rowVenta.id)
                                                            .setCoEmpresa(co_empresa)
                                                            .setCoSucursal(co_empresa)
                                                            .setGenero(genero)
                                                            .build();
                //guardar detalle de venta
                await ventaDetalleDao.insert(detalleVentaInsertData).transacting(transactionActive);                 
                
                const veMovimiento = new VeMovimiento();

                 const movimientoInsert = veMovimiento.setCoEmpresa(co_empresa)
                            .setCoSucursal(co_sucursal)
                            .setGenero(genero)
                            .setCatTipoMovimiento(ID_TIPO_MOVIMIENTO_VENTA)
                            .setCatArticuloSucursal(detalleVenta.cat_articulo_sucursal)
                            .setCantidad(detalleVenta.cantidad)
                            .build();


                //agregar un movimiento de venta - SALIDA
                await movimientoArticuloDao.createMovimientoArticulo(
                                                detalleVenta.cat_articulo_sucursal,
                                                detalleVenta.cantidad,
                                                {
                                                    ...movimientoInsert,
                                                    transaction:transactionActive                                                   
                                                }
                                            );
            }            
     });    

    return true;

    }catch(error){
        console.log(error);
        return false;
    }
}

//getTicket

module.exports = {
   createVenta
};