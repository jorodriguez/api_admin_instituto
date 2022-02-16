const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const {MOVIMIENTO_ENTRADA,MOVIMIENTO_SALIDA} = require('../utils/Movimientos');
const Dao = require('./Dao');
const movimientoDao = new Dao(Tables.VE_MOVIMIENTO); 
const catArticuloSucursalDao = new Dao(Tables.CAT_ARTICULO_SUCURSAL); 
const VeMovimiento = require('../models/VeMovimiento');


const createMovimientoArticulo = async (catArticuloSucursal,cantidadAfectacion,data) => {
    console.log("@createMovimientoArticulo");

    try {
        //co_empresa,co_sucursal,cat_tipo_movimiento,cat_articulo_sucursal,cantidad,cantidad_anterior,cantidad_posterior
        const movimientoData = Object.assign(new VeMovimiento(),data);        

        const articuloSucursal = await catArticuloSucursalDao.finfById(catArticuloSucursal);

        const tipoMovimiento = await movimientoDao.finfById(movimientoData.cat_tipo_movimiento);                      
      
        const cantidadActualizar = 0;
        
        if(tipoMovimiento.afectacion == MOVIMIENTO_ENTRADA){
            cantidadActualizar = (articuloSucursal.cantidad_existencia + cantidadAfectacion);
        }
        
        if(tipoMovimiento.afectacion == MOVIMIENTO_SALIDA){
            cantidadActualizar = (articuloSucursal.cantidad_existencia - cantidadAfectacion);
        }

        const cantidadAnteriorActualizar = articuloSucursal.cantidad_existencia;
        const cantidadPosteriorActualizar = cantidadActualizar;
         
        const { transaction } = data;
        
        let rowMovimiento;

        if(transaction){
            
            rowMovimiento = await movimientoDao.insert(movimientoData).transacting(transaction);                   

            await catArticuloSucursalDao.update(
                                            catArticuloSucursal,
                                            {cantidad_existencia:cantidadActualizar,
                                                cantidad_anterior:cantidadAnteriorActualizar,
                                                cantidad_posterior:cantidadPosteriorActualizar,
                                                fecha_modifico:new Date(),
                                                modifico:data.genero}
                                            ).transacting(transaction);
        }else{
            
            rowMovimiento = await movimientoDao.insert(movimientoData);

            await catArticuloSucursalDao.update(catArticuloSucursal,
                                    {cantidad_existencia:cantidadAnteriorActualizar,
                                    cantidad_anterior:cantidadPosteriorActualizar,
                                    cantidad_posterior:cantidad_posterior,
                                    fecha_modifico:new Date(),
                                    modifico:data.genero});
        }        
        
        return rowMovimiento;

    }catch(error){
        console.log(error);
        return false;
    }
}




module.exports = {
    createMovimientoArticulo
};