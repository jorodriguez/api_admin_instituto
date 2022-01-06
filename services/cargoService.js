

const cargosDao = require('../dao/cargoDao');
const alumnoDao = require('../dao/alumnoDao');
const catCargoDao = require('../dao/catCargoDao');
const cursoDao = require('../dao/cursoDao');
const inscripcionDao = require('../dao/inscripcionDao');

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


const registrarInscripcion = async (idCurso,idAlumno,genero) => {
    console.log("@registrarInscripcion");
    //id_alumno, cat_cargo, cantidad,cargo,total, nota,monto,monto_modificado,monto_original,texto_ayuda,genero
    console.log(`idCurso ${idCurso} idAlumno ${idAlumno} genero ${genero}`);

    const ID_CARGO_INSCRIPCION = 2;

    const inscripcionAlumno = await inscripcionDao.getInscripcionAlumnoCurso(idAlumno,idCurso);

    if(inscripcionAlumno != null && inscripcionAlumno.cargo_inscripcion_agregado == true){
        
        console.log(" Ya tiene inscripcion agregada ");

    }else{
          console.log(" procediendo a agregar la  inscripcion  "+inscripcionAlumno);                

    let idCargoInscripcion = await cargosDao.registrarCargoGeneral({
             id_alumno:idAlumno,  
             cat_cargo:ID_CARGO_INSCRIPCION, 
             cantidad:1,
             cargo:inscripcionAlumno.costo_inscripcion,
             total:inscripcionAlumno.costo_inscripcion,
             nota:"CARGO GENERADO AUTOMÁTICAMENTE.",
             monto:inscripcionAlumno.costo_inscripcion,
             monto_modificado:false,
             monto_original:inscripcionAlumno.costo_inscripcion,
             co_curso:inscripcionAlumno.id_curso,             
             genero:genero
        });

        // modificar la inscripcion
        await inscripcionDao.actualizarCampoInscripcion(inscripcionAlumno.id,idCargoInscripcion,genero);

        //actualizar totales adeuda
        await inscripcionDao.actualizarTotalAdeudaInscripcion(inscripcionAlumno.id_alumno,inscripcionAlumno.id_curso,genero);
       
    }

}

const registrarColegiatura = async (idCurso,idAlumno,genero) => {
    console.log("@registrarColegiatura");
    //id_alumno, cat_cargo, cantidad,cargo,total, nota,monto,monto_modificado,monto_original,texto_ayuda,genero
    
    const ID_CARGO_COLEGIATURA = 1;    

    const inscripcionAlumno = await inscripcionDao.getInscripcionAlumnoCurso(idCurso,idAlumno);

    if(inscripcionAlumno){               
          
          console.log(" procediendo a agregar la  inscripcion  ");               

          let idCargoColegiatura = await cargosDao.registrarCargo({
             id_alumno:idAlumno,  
             cat_cargo:ID_CARGO_COLEGIATURA, 
             cantidad:1,
             cargo:inscripcionAlumno.costo_colegiatura,
             total:inscripcionAlumno.costo_colegiatura,
             nota:"CARGO GENERADO AUTOMÁTICAMENTE.",
             monto:inscripcionAlumno.costo_colegiatura,
             monto_modificado:inscripcionAlumno.costo_colegiatura,
             monto_original:inscripcionAlumno.costo_colegiatura,
             co_curso:inscripcionAlumno.id_curso,    
             texto_ayuda:"semana No. ",
             genero:genero
        });      

         //actualizar totales adeuda
         await inscripcionDao.actualizarTotalAdeudaInscripcion(inscripcionAlumno.id_alumno,inscripcionAlumno.id_curso,genero);
    }
    
}



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
     /*const informacionAlumno = await alumnoDao.getCorreosTokensAlumno(idAlumno);  
     let estado = await cargosDao.obtenerEstadoCuenta(idAlumno);         
     return {...estado,
            padres:{
                    nombre_padres: informacionAlumno ? informacionAlumno.nombres_padres : '',
                    correos:  informacionAlumno ? informacionAlumno.correos : ''
                }
            };
            */
    return await cargosDao.obtenerEstadoCuenta(idAlumno);         

};

const obtenerPreviewEstadoCuenta = async (idAlumno)=>{
    const params = await obtenerEstadoCuentaAlumno(idAlumno);
    //console.log(JSON.stringify(params));
    const { id_empresa } = params.alumno;
    return await getHtmlPreviewTemplate(TEMPLATES.TEMPLATE_ESTADO_CUENTA,params,id_empresa);
};



module.exports = {   
    registrarCargo,
    registrarInscripcion,
    registrarColegiatura,
    getCatalogoCargosPorEmpresa,
    getCargosAlumno,
    getBalanceAlumno,    
    eliminarCargos,
    obtenerMesesAdeudaMensualidad,    
    obtenerFiltroAniosCargosSucursal,
    obtenerEstadoCuentaAlumno,
    obtenerPreviewEstadoCuenta,
    getCargoExtraMensualidadEmpresa
}; 