const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const articuloDao = new Dao(Tables.CAT_ARTICULO); 
const articuloSucursalDao = new Dao(Tables.CAT_ARTICULO); 
const  CatArticuloSucursal = require('../models/CatArticuloSucursal');
const  CatArticulo = require('../models/CatArticulo');

const getArticulos = async (coSucursal) => {
    console.log("@getArticulos");
    return await genericDao
        .findAll(
            queryBase(` suc.id = $1 `)
            , [coSucursal]);
};

const getArticuloCodigo = async (coSucursal,codigo) => {
    console.log("@getArticuloCodigo");
    return await genericDao
        .findAll(
            queryBase(` a.codigo = $2  and suc.id = $1 `)
            , [coSucursal,codigo]);
};

const getArticulosPorNombre = async (coSucursal,nombre) => {
    console.log("@getArticulosNombre");
    return await genericDao
        .findAll(
            queryBase(` a.nombre like '%$2%'  and suc.id = $1 `)
            , [coSucursal,nombre]);
};

const updatePrecio = async (id,data) => {
    console.log("@actualizarPrecio");

    //const articuloSucursal = new CatArticuloSucursal(); 

    const row = await articuloSucursalDao.update(id,{
                            precio:data.precio,
                            costo_base:data.costo_base,
                            cantidad_existencia:data.cantidad_existencia,
                            stock_minimo:data.stock_minimo,
                            nota_interna:data.nota_interna,
                            fecha_modifico:new Date(),
                            modifico:data.genero
                        });
    return row;
}


const updateArticulo = async (id,data) => {
    console.log("@updateArticulo");  
    
    const articuloData = Object.assign(new CatArticulo(),data);

    const data = articuloData.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

    const row = await articuloDao.update(id,data);
    return row;
}


const createArticulo = async (data) => {
    console.log("@createArticulo");

    //const articuloSucursal = new CatArticuloSucursal(); 
    try {

    const articuloData = Object.assign(new CatArticulo(),data);
    
    const articuloSucursalData = Object.assign(new CatArticuloSucursal(),data);

    
    articuloDao.getTransaction(async transactionActive =>{
            //insertar en catalogo de articulos
            const rowArticulo = await articuloDao.insert(articuloData).transacting(transactionActive);         

            const dataInsertArticuloSucursal = articuloSucursalData.setCatArticulo(rowArticulo.id).build();

            //insertar en el precio en relacion con la sucursal
            await articuloSucursalDao.insert(dataInsertArticuloSucursal).transacting(transactionActive);

     });    

    return true;

    }catch(error){
        console.log(error);
        return false;
    }
}





const queryBase = (criterio)=>`

select art.id,
	art.co_empresa,
	art.co_sucursal,
	art.cat_articulo,
	art.precio,
	art.costo_base,
	art.cantidad_existencia,
	art.stock_minimo,
	art.nota_interna,
	a.codigo,
	a.nombre,
	a.descripcion,
	a.foto,
    m.id as cat_marca,
	m.nombre as marca, 
    c.id as cat_categoria,
    c.nombre as categoria,
	suc.nombre as sucursal
from cat_articulo_sucursal art inner join cat_articulo a on a.id = art.cat_articulo
					    	inner join cat_marca m on m.id = a.cat_marca
                            inner join cat_categoria c on c.id = a.cat_categoria
					        inner join co_sucursal suc on suc.id = art.co_sucursal
where ${criterio ? criterio  : ''}
    ${criterio ? ' and '  : ''}
	a.eliminado = false
	and art.eliminado = false

`;



module.exports = {
    getArticuloCodigo,
    getArticulos,
    updatePrecio,
    updateArticulo,
    createArticulo,    
    getArticulosPorNombre,
};