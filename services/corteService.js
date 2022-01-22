
const gastoDao = require('../dao/gastoDao');
const cortesDao = require('../dao/cortesDao');
const sucursalDao = require('../dao/sucursalDao');
const templateService = require('./templateService');
const {TIPO_TEMPLATE} = require('../utils/Constantes');

const getCorteDiaSucursal = async (corteData)=>{
    console.log("@getCorteDiaSucursal");
    
    const {idSucursal,fecha,idUsuario} = corteData;

    console.log("Fecha "+fecha);
    console.log("suc "+idSucursal);
    console.log("suc "+idUsuario);
    
    const sumaIngreso = await cortesDao.getSumaPagosPorRango({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const resultsIngreso = await cortesDao.getDetallePagos({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});


    const sumaGastos = await gastoDao.getGastosSumaCortePorSucursal({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const resultsGastos = await gastoDao.getGastosCortePorSucursal({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    
    return {
            fecha:fecha,
            totalIngreso: (sumaIngreso ? sumaIngreso.total : 0),detalleIngreso:resultsIngreso,
            totalGasto:(sumaGastos ? sumaGastos.total : 0), detalleGasto:resultsGastos
            };
};


const getHtmlCorteDiaSucursal = async (corteData)=>{
    console.log("@getHtmlCorteDiaSucursal");
    
    const corte = await getCorteDiaSucursal(corteData);

    const {idSucursal} = corteData;
    const sucursal =  await sucursalDao.getSucursalPorId(idSucursal);    

   //leer el template
   const params = {
        dia_corte:corte.fecha,
        total_ingreso:corte.totalIngreso ,
        total_gasto:corte.totalGasto ,
        total_caja: (corte.totalIngreso-corte.totalGasto),
        nombre_sucursal:sucursal.nombre,
        direccion_sucursal:sucursal.direccion,
        telefono_sucursal:sucursal.telefono
   };
   const html = await  templateService
   .loadTemplateEmpresa({
           params:params,
           idEmpresa:sucursal.co_empresa,
           idUsuario:corteData.idUsuario,
           tipoTemplate:TIPO_TEMPLATE.CORTE_DIARIO
       });
      
    return html;
};




module.exports = {
    getCorteDiaSucursal,
    getHtmlCorteDiaSucursal
};


