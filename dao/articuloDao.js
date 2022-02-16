const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const proveedorDao = new Dao(Tables.USUARIO); // un usuario es un proveedor

const getArticulos = async (coSucursal,genero) => {
    console.log("@getArticulos");
    return await genericDao
        .findAll(
            `select u.*,suc.nombre as sucursal,estatus.nombre as estatus
                    from usuario u inner join co_sucursal suc on suc.id = u.co_sucursal
                            inner join si_estatus estatus on estatus.id = u.si_estatus
                    where u.genero = $2
                            and u.eliminado = false
                            and u.co_sucursal = $1`, [coSucursal,genero]);
};


const eliminarProveedor = async (id,data) => {
    console.log("@eliminarCuentaProveedor");
    
    const {genero,motivo} = data;
    
    //const r = await genericDao.execute(`
    const r = await genericDao.execute(`    
            update USUARIO
            set fecha_baja = getDate(''),
                motivo_baja = $2,
                fecha_modifico = (getDate('')+getHora(''))::timestamp, 
                modifico = $3, 
                eliminado = true 
            Where id = $1 returning *;
    `,[id,motivo,genero]);
    

    console.log(JSON.stringify(r));

    return r;

};





module.exports = {
    getCuentas,
    eliminarProveedor,
    ...proveedorDao
};