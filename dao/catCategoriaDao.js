const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const categoriaDao = new Dao(Tables.CAT_CATEGORIA); 
const  CatCategoria = require('../models/CatCategoria');

aqui voy haciendo el catalogo de categoriaDao
const getAll = async (coEmpresa) => {
    console.log("@getAllCategoria");
    return await genericDao.findAll(queryBase(), [coEmpresa]);
};

const updateCategoria = async (id,data) => {
    console.log("@updateCategoria");  
    
    const data = Object.assign(new CatCategoria(),data);

    const dataWillUpdate = data.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

    const row = await categoriaDao.update(id,dataWillUpdate);

    return row;
}

const createCategoria = async (data) => {
    console.log("@createCategoria");
    try {

        const data = Object.assign(new CatCategoria(),data);
        
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