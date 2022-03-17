const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const marcaDao = new Dao(Tables.CAT_MARCA); 
const  CatMarca = require('../models/CatMarca');


const getAll = async (coEmpresa) => {
    console.log("@getAll");
    return await genericDao.findAll(queryBase(), [coEmpresa]);
};

const updateMarca = async (id,data) => {
    console.log("@updateCarca");  
    
    const marcaData = Object.assign(new CatMarca(),data);

    const dataWillUpdate = marcaData.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

    const row = await marcaDao.update(id,dataWillUpdate);

    return row;
}

/*
const deleteMarca = async (id,data) => {
    console.log("@deleteMarca");  
    
    const marcaData = Object.assign(new CatMarca(),data);

    const dataWillUpdate = marcaData.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

    const row = await marcaDao.getKnex()

    return row;
}*/

const createMarca = async (data) => {
    console.log("@createMarca");
    try {

        const marcaData = Object.assign(new CatMarca(),data);
        
        return await marcaDao.insert(marcaData.build());        
        
    }catch(error){
        console.log(error);
        return false;
    }
}


const queryBase = ()=>`
        select * 
        from cat_marca 
            where co_empresa = $1 
            and eliminado = false
`;




module.exports = {
    createMarca,
    updateMarca,
    getAll,
    marcaDao   
    
};