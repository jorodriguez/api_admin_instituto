const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const unidadMedidaDao = new Dao(Tables.CAT_UNIDAD_MEDIDA); 
const CatUnidadMedida = require('../models/CatUnidadMedida');


const getAll = async (coEmpresa) => {
    console.log("@getAllUnidadMedida");
    return await genericDao.findAll(queryBase(), [coEmpresa]);
};

const updateUnidadMedida = async (id,data) => {
    console.log("@updateUnidadMedida");  
    
    const unidadMedidaData = Object.assign(new CatUnidadMedida(),data);

    const dataWillUpdate = unidadMedidaData.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

    const row = await marcaDao.update(id,dataWillUpdate);

    return row;
}


const createUnidadMedida = async (data) => {
    console.log("@createUnidadMedida");
    try {

        const marcaData = Object.assign(new CatUnidadMedida(),data);
        
        return await marcaDao.insert(marcaData.build());        
        
    }catch(error){
        console.log(error);
        return false;
    }
}


const queryBase = ()=>`
        select * 
        from cat_unidad_medida
            where co_empresa = $1 
            and eliminado = false
`;




module.exports = {
    createUnidadMedida,
    updateUnidadMedida,
    getAll,
    unidadMedidaDao
    
};