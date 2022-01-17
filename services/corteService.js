

const cortesDao = require('../dao/cortesDao');

const getCorteDiaSucursal = async (corteData)=>{
    console.log("@getCorteDiaSucursal");
    
    const {idSucursal,fecha} = corteData;

    console.log("Fecha "+fecha);
    console.log("suc "+idSucursal);
    
    const suma = await cortesDao.getSumaPagosPorRango({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const results = await cortesDao.getDetallePagos({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});
    
    return {fecha:fecha,total: (suma ? suma.total : 0),detalle:results};
};



module.exports = {
    getCorteDiaSucursal
};

