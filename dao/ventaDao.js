const genericDao = require('./genericDao');
const {castDateToStr} = require('../utils/UtilsDate');
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
        const { venta,detalleVenta,co_empresa,co_sucursal,genero } = data;
        
        const ventaInsertData = Object.assign(new VeVenta(),venta);
       
        ventaInsertData.setCoEmpresa(co_empresa)
                        .setCoSucursal(co_sucursal)
                        .setGenero(genero);

        console.log("iniciando el guardado de la venta");

        let rowVenta  = null;
    
        await ventaDao.getKnex().transaction(async transactionActive =>{
            //console.log("iniando el guardado de la venta "+JSON.stringify(ventaInsertData));

            const dataResultConsecutivo = await transactionActive.raw(`select * from obtener_consecutivo('TICKET_VENTA',?)`,[co_sucursal]);
            
            const { rows } = dataResultConsecutivo;

            const consecutivo =  (rows && rows.length > 0)  ? rows[0]:null;

            console.log("Consecutivo "+JSON.stringify(consecutivo));

            ventaInsertData.setFolio(consecutivo.valor);
            
            //const rowVenta = await ventaDao.insert(ventaInsertData.build()).transacting(transactionActive);         
            const resultsVenta = await transactionActive(Tables.VE_VENTA).insert(ventaInsertData.build()).returning('*');         

            rowVenta = resultsVenta.length > 0 ? resultsVenta[0]:null;
          
            console.log("VENTA GENERADA "+JSON.stringify(rowVenta));
            //guardar detalle
            for(let i = 0; i < detalleVenta.length; i++){
                                              
                const detalleVentaItem = Object.assign(new VeVentaDetalle(),  detalleVenta[i]);

                const detalleVentaInsertData = detalleVentaItem.setVeVenta(rowVenta.id)
                                                            .setCoEmpresa(co_empresa)
                                                            .setCoSucursal(co_empresa)
                                                            .setGenero(genero)
                                                            .build();

                console.log("guardando el detalle "+JSON.stringify(detalleVentaInsertData));
                //guardar detalle de venta
                //await ventaDetalleDao.insert(detalleVentaInsertData).transacting(transactionActive);                 
                const detalleRow =  await transactionActive(Tables.VE_VENTA_DETALLE).insert(detalleVentaInsertData).returning("*");                                
                
                const veMovimiento = new VeMovimiento();

                console.log("guardando Movimiento ");

                 const movimientoInsert = veMovimiento.setCoEmpresa(co_empresa)
                            .setCoSucursal(co_sucursal)
                            .setGenero(genero)
                            .setCatTipoMovimiento(ID_TIPO_MOVIMIENTO_VENTA)
                            .setCatArticuloSucursal(detalleVentaItem.cat_articulo_sucursal)
                            .setCantidad(detalleVentaItem.cantidad)
                            .build();



                //agregar un movimiento de venta - SALIDA
                await movimientoArticuloDao.createMovimientoArticulo(
                                                detalleVentaItem.cat_articulo_sucursal,
                                                detalleVentaItem.cantidad,
                                                {
                                                    ...movimientoInsert,
                                                    transaction:transactionActive                                                   
                                                }
                                            );
            }            
     });    

     console.log("Termino el proceso de ventas");

    return {venta:rowVenta,error:false};

    }catch(error){
        console.log(error);
        return {venta:null,error:true};
    }
}

//getTicket
const getVentaById =async (idVenta)=>{
    return await genericDao.findOne(getQuery(' ve.id = $1 '),[idVenta]);
}

const getVentasSucursal =async (data)=>{
    
    const {idSucursal,fecha} = data;

    const fechaFind =  castDateToStr(fecha);

    return await genericDao.findAll(getQuery(` suc.id = $1 and to_char(ve.fecha,'YYYY-MM-DD') = $2 `),[idSucursal,fechaFind]);
}

const getQuery = (criterio,limit)=> `
        select ve.id,	
            to_char(ve.fecha,'DD-MM-YYYY HH24:MI') as fecha,
            ve.folio,
            ve.cantidad_articulos,
            ve.total,
            ve.recibido,
            ve.cambio,
            ve.nota_venta,
            suc.nombre as sucursal,
            suc.direccion as direccion_sucursal,
            suc.telefono as telefono_sucursal,
            ve.co_empresa,
            ve.genero,
            u.nombre as nombre_usuario
        from ve_venta ve inner join co_sucursal suc on suc.id = ve.co_sucursal
               inner join usuario u on u.id = ve.genero
        where ${criterio && criterio}
            ${criterio && ' AND ve.eliminado = false'}
            ORDER BY ve.folio desc
            ${limit ? (' LIMIT '+limit) : ''}
`;



module.exports = {
   createVenta,
   getVentasSucursal,
   getVentaById
};