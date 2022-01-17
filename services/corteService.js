
const gastoDao = require('../dao/gastoDao');
const cortesDao = require('../dao/cortesDao');

const getCorteDiaSucursal = async (corteData)=>{
    console.log("@getCorteDiaSucursal");
    
    const {idSucursal,fecha} = corteData;

    console.log("Fecha "+fecha);
    console.log("suc "+idSucursal);
    
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



module.exports = {
    getCorteDiaSucursal
};

