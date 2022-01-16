

const cortesDao = require('../dao/cortesDao');

const getCorteDiaSucursal = async (idSucursal)=>{
    
    const results = await cortesDao.getCortePagosSucursal(idSucursal);
    
     return results;
};



module.exports = {
    getCorteDiaSucursal
};

