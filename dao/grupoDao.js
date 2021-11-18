const genericDao = require('./genericDao');

const registrarGrupo = async (grupoData) => {
    console.log("@registrarGrupo");
    
    const { nombre,color,co_empresa, genero } = grupoData;
    let sql = `INSERT INTO CO_GRUPO(nombre,color,co_empresa,genero)
                VALUES($1,$2,$3,$4) returning id;`;

    return await genericDao.execute(sql,[nombre,color,co_empresa,genero]);  
    
};


const modificarGrupo = async (grupoData) => {
    console.log("@modificarGrupo");
    
    const { id, nombre,color, genero } = grupoData;
    let sql = `
    UPDATE CO_GRUPO SET 
                    NOMBRE = TRIM(BOTH FROM $2),
                    COLOR = TRIM(BOTH FROM $3),                    
                    MODIFICO = $4,                                                
                    FECHA_MODIFICO = (current_date+current_time)
    WHERE id = $1
    returning id;
    `;

    return await genericDao.execute(
                sql,[id,nombre,color,genero]);
};


const eliminarGrupo = async (idGrupo, genero) => {
    console.log("@eliminarGrupo");

    return await genericDao.eliminarPorId("CO_GRUPO", idGrupo, genero);

};

const getGruposPorEmpresa = async (idEmpresa) => {
    console.log("@getAll");
    return await genericDao.findAll("SELECT * from CO_GRUPO where co_empresa = $1 and eliminado = false order by nombre", [idEmpresa]);

};


module.exports = {
   registrarGrupo,
   modificarGrupo,
   eliminarGrupo,
   getGruposPorEmpresa
};