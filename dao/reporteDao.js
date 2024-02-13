
const genericDao = require('./genericDao');
const {castDateToStr} = require('../utils/UtilsDate');
const { Exception } = require('../exception/exeption');


const getReportes = async () => {
    console.log("@getReportes");      
      
    return await genericDao.findAll(`SELECT id,nombre,columnas,rango_fecha,criterio_busqueda FROM SI_REPORTE WHERE ELIMINADO = FALSE`,[]);
};



const getEjecucionReporte = async (parametrosData) => {
    console.log("@getEjecucionReporte");
  
    const {idReporte,idSucursal,fechaInicio,fechaFin} = parametrosData;
    console.log("ID REPORTE = "+idReporte);
    const reporte = await genericDao
                        .findOne(
                            `SELECT id,nombre,consulta,columnas,rango_fecha,criterio_busqueda FROM SI_REPORTE WHERE ID = $1 AND ELIMINADO = FALSE`,
                            [idReporte]
                        );            
    console.log("REGISTRO "+reporte);

    if(!reporte){
        throw new Exception("No se encuentra el reporte");
    }
  
    const fechaInicioFormat =castDateToStr(fechaInicio);
    const fechaFinFormat =castDateToStr(fechaFin);

    let params = [];
    
    params[0] = idSucursal;

    if(reporte.rango_fecha){
        params[1] = fechaInicioFormat;
        params[2] = fechaFinFormat;        
    }

    console.log("CONSULTA "+reporte.consulta);

    console.log(`Parametros ${params}`);

    return await genericDao.findAll(`${reporte.consulta}`,params);
};


module.exports = {    
    getReportes    ,
    getEjecucionReporte
}