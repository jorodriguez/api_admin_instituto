

const cargosDao = require('../dao/cargoDao');
const alumnoDao = require('../dao/alumnoDao');
//const notificacionService = require('../utils/NotificacionService');
const { getHtmlPreviewTemplate,TEMPLATES } = require('../utils/CorreoService');

//registrar pagos
const registrarCargo = async (cargoData) => {
    console.log("@registrarCargo");
    try{
     const respuesta = await cargosDao.registrarCargo(cargoData);
     console.log("Enviar correo de cargo"); 
                                                                   
     return respuesta;
    }catch(error){
        console.log(" X X X X X "+error);
        return error;
    }
   
};

const completarRegistroRecargoMensualidad = (idAlumno,idCargoMensualidad,idRecargo,genero)=>{    
    return new Promise((resolve,reject)=>{
            cargosDao
                .completarRegistroRecargoMensualidad(
                        idCargoMensualidad,
                        idRecargo,
                        genero
                ).then(id=>{
                    console.log("Registro de recargo relacionado a la mensualidad ");
                    //actualizar fecha pago proximo mes
                    alumnoDao
                        .actualizarProximaFechaLimitePagoMensualidadAlumno(
                                idAlumno,
                                genero
                        ).then(id=>{
                                console.log("Registro de fecha limite de pago actualizado al proximo mes");
                            resolve(id);
                        }).catch(error=>reject(error));
            }).catch(error=>reject(error));
    });
    
};


const getCatalogoCargosPorEmpresa = (idEmpresa) => {
    console.log("@getCatalogoCargosPorEmpresa");
    return cargosDao.getCatalogoCargosPorEmpresa(idEmpresa);
};

const getCargoExtraMensualidadEmpresa = (idEmpresa) => {
    console.log("@getCargoExtraMensualidadEmpresa");
    return cargosDao.getCargoExtraMensualidadEmpresa(idEmpresa);
};


const getCargosAlumno = (idAlumno,limite) => {
    console.log("@getCargosAlumno");

    return cargosDao.getCargosAlumno(idAlumno,limite);
};

const getBalanceAlumno = (idAlumno) => {
    console.log("@getBalanceAlumno");

    return cargosDao.getBalanceAlumno(idAlumno);

};

const eliminarCargos = (idCargos) => {
    console.log("@eliminarCargos");
    return cargosDao.eliminarCargos(idCargos);
};

const obtenerMesesAdeudaMensualidad = (idAlumno) => {
    console.log("@obtenerMesesAdeudaMensualidad");

    return cargosDao.obtenerMesesAdeudaMensualidad(idAlumno);
};

const obtenerFiltroAniosCargosSucursal = (idSucursal) => {
    console.log("@obtenerFiltroAniosCargosSucursal");

    return cargosDao.obtenerFiltroAniosCargosSucursal(idSucursal);
};

const obtenerEstadoCuentaAlumno = async (idAlumno) => {
    console.log("@obtenerEstadoCuentaAlumno");    
     const informacionAlumno = await alumnoDao.getCorreosTokensAlumno(idAlumno);  
     let estado = await cargosDao.obtenerEstadoCuenta(idAlumno);         
     return {...estado,
            padres:{
                    nombre_padres: informacionAlumno ? informacionAlumno.nombres_padres : '',
                    correos:  informacionAlumno ? informacionAlumno.correos : ''
                }
            };
};

const obtenerPreviewEstadoCuenta = async (idAlumno)=>{
    const params = await obtenerEstadoCuentaAlumno(idAlumno);
    //console.log(JSON.stringify(params));
    const { id_empresa } = params.alumno;
    return await getHtmlPreviewTemplate(TEMPLATES.TEMPLATE_ESTADO_CUENTA,params,id_empresa);
};



module.exports = {   
    registrarCargo,
    getCatalogoCargosPorEmpresa,
    getCargosAlumno,
    getBalanceAlumno,    
    eliminarCargos,
    obtenerMesesAdeudaMensualidad,
    completarRegistroRecargoMensualidad,
    obtenerFiltroAniosCargosSucursal,
    obtenerEstadoCuentaAlumno,
    obtenerPreviewEstadoCuenta,
    getCargoExtraMensualidadEmpresa
};