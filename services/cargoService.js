

const cargosDao = require('../dao/cargoDao');
const alumnoDao = require('../dao/alumnoDao');
const catCargoDao = require('../dao/catCargoDao');
const cursoDao = require('../dao/cursoDao');
const inscripcionDao = require('../dao/inscripcionDao');
const CONSTANTES = require('../utils/Constantes');

//const notificacionService = require('../utils/NotificacionService');
const { getHtmlPreviewTemplate,TEMPLATES } = require('../utils/CorreoService');
const cursoSemanasService = require('./cursoSemanasService');
const { getSemanaActual } = require('./cursoSemanasService');
const alumnoService = require('./alumnoService');

//registrar cargos
const registrarCargo = async (cargoData) => {
    console.log("@registrarCargo");
    try{        

     const {id_curso,cat_cargo,uid_alumno,id_curso_semana,cantidad, monto, nota,genero} = cargoData;

     const alumno = await alumnoService.getAlumnoPorUId(uid_alumno);

     let respuesta = null;

     if(cat_cargo.id == CONSTANTES.ID_CARGO_COLEGIATURA){
         console.log("Es colegiatura");
         respuesta = await registrarColegiatura(id_curso,alumno.id,id_curso_semana,genero);
     }

     if(cat_cargo.id == CONSTANTES.ID_CARGO_INSCRIPCION){
        console.log("Es inscripcion");
        respuesta = await registrarInscripcion(id_curso,alumno.id,genero);
     }

     if(cat_cargo.id != CONSTANTES.ID_CARGO_INSCRIPCION && cat_cargo != CONSTANTES.ID_CARGO_COLEGIATURA){
        console.log("Es un cargo especial");
        respuesta = await guardarCargoGenerico(alumno.id,cat_cargo.id,cantidad,monto,"",nota,genero);
     }
       
     //enviar correo de recibo
                                                                        
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

    const cargoInscripcion = await cargosDao.buscarCargoInscripcion(idCurso,idAlumno);
        
    if(cargoInscripcion != null ){
        console.log("                                          ");
        console.log("   YA TIENE INSCRIPCION AGREGADA ");
        console.log("                                          ");

    }else{       
        
        const inscripcionAlumno = await inscripcionDao.getInscripcionAlumnoCurso(idAlumno,idCurso);    

        console.log(" procediendo a agregar la  inscripcion  "+inscripcionAlumno);                

        let idCargoInscripcion = await cargosDao.registrarCargoGeneral({
             id_alumno:idAlumno,  
             cat_cargo:ID_CARGO_INSCRIPCION, 
             cantidad:1,
             cargo:inscripcionAlumno.costo_inscripcion,
             total:inscripcionAlumno.costo_inscripcion,
             nota:"CARGO DE INSCRIPCIÓN GENERADO AUTOMÁTICAMENTE.",
             monto:inscripcionAlumno.costo_inscripcion,
             monto_modificado:false,
             monto_original:inscripcionAlumno.costo_inscripcion,
             co_curso:inscripcionAlumno.id_curso,             
             genero:genero
        });

      
        //actualizar totales adeuda
        await inscripcionDao.actualizarTotalAdeudaInscripcion(inscripcionAlumno.id_alumno,inscripcionAlumno.id_curso,genero);
        await cursoDao.actualizarTotalAdeudaAlumno(idAlumno,genero);
       
    }

}

const registrarColegiaturaAlumnoSemanaActual = async (idCurso,idAlumno,genero) => {
    
    console.log("@registrarColegiaturaAlumnoSemanaActual");
    
    //obtener Semana ocurriendo
    const cursoSemanaActual = await cursoSemanasService.getSemanaActualCurso(idCurso);    

    console.log(JSON.stringify(cursoSemanaActual));

    //verificar existencia del registro
    const cargoColegiatura = await cargosDao.buscarCargoColegiatura(idCurso,cursoSemanaActual.id,idAlumno);

    console.log("      Colegiatura "+JSON.stringify(cargoColegiatura));
    
    if(cargoColegiatura != null){
            console.log("                                          ");
            console.log(">> YA EXISTE LA COLEGIATURA DE LA SEMANA ");
            console.log("                                          ");
    }else{    
        const idColegiatura = await  guardarColegiatura(idCurso,idAlumno,cursoSemanaActual.id,'',cursoSemanaActual.numero_semana_curso, genero);
        console.log("cargo registrado "+idColegiatura);
    }   

}


const registrarColegiatura = async (idCurso,idAlumno,idCursoSemana,genero) => {
    
    console.log("@registrarColegiatura");

    let retId = null;

    const cursoSemana = await cursoSemanasService.getSemanaCursoById(idCursoSemana);
        
    const cargoColegiatura = await cargosDao.buscarCargoColegiatura(idCurso,idCursoSemana,idAlumno);

    console.log("      Colegiatura "+JSON.stringify(cargoColegiatura));
    
    if(cargoColegiatura != null){
            console.log("                                          ");
            console.log(">> YA EXISTE LA COLEGIATURA DE LA SEMANA ");
            console.log("                                          ");
    }else{    
        retId = await  guardarColegiatura(idCurso,idAlumno,idCursoSemana,'',cursoSemana.numero_semana_curso, genero);
        console.log("cargo registrado "+idColegiatura);
    }   

    return retId;

}

const guardarColegiatura = async (idCurso,idAlumno,coCursoSemana,folio,numeroSemana,genero) => {
    console.log("@guardarColegiatura");
    //id_alumno, cat_cargo, cantidad,cargo,total, nota,monto,monto_modificado,monto_original,texto_ayuda,genero
    
    const ID_CARGO_COLEGIATURA = 1;    
   
    let idRet=null;
    const inscripcionAlumno = await inscripcionDao.getInscripcionAlumnoCurso(idAlumno,idCurso);

    if(inscripcionAlumno){               
          
          console.log(" procediendo a agregar la  colegiatura  ");               

          idRet = await cargosDao.registrarCargoGeneral({
             id_alumno:idAlumno,  
             cat_cargo:ID_CARGO_COLEGIATURA, 
             cantidad:1,
             folio:folio,            
             cargo:inscripcionAlumno.costo_colegiatura,
             co_curso_semanas:coCursoSemana,
             total:inscripcionAlumno.costo_colegiatura,
             nota:"CARGO GENERADO AUTOMÁTICAMENTE.",
             monto:inscripcionAlumno.costo_colegiatura,
             monto_modificado:false,
             monto_original:inscripcionAlumno.costo_colegiatura,
             co_curso:inscripcionAlumno.id_curso,    
             texto_ayuda:`Semana ${numeroSemana || ''}`,
             genero:genero
        });      

         //actualizar totales adeuda
         await inscripcionDao.actualizarTotalAdeudaInscripcion(inscripcionAlumno.id_alumno,inscripcionAlumno.id_curso,genero);
         //await alumnoDao.actualizarTotalAdeudaAlumno(idAlumno,genero);
         await cursoDao.actualizarTotalAdeudaAlumno(idAlumno,genero);

        
    }else{
        console.log("xx NO SE ENCONTRO LA INSCRIPCION DEL ALUMNO");

    }
    
    return idRet;
}


const guardarCargoGenerico = async (idAlumno,cat_cargo,cantidad,monto,folio,nota, genero) => {
    console.log("@guardarCargoGenerico");     
       
          let idRet=null;

          const cargoCatalogo = await cargosDao.getCatCargo(cat_cargo);
          
          let montoModificado = false;
          
          let cargoAplicar = cargoCatalogo.precio;

          if(cargoCatalogo.escribir_monto){
              //se toma el monto que viene como parametro
              cargoAplicar = monto;
              montoModificado = (cargoCatalogo.precio != monto);
          }          

          const montoTotal = (cargoAplicar * cantidad);
          
          
          idRet = await cargosDao.registrarCargoGeneral({
             id_alumno:idAlumno,  
             cat_cargo:cat_cargo, 
             cantidad:1,
             folio:folio,            
             cargo: cargoAplicar,
             co_curso_semanas:null,
             total:montoTotal,
             nota: (nota || ''),
             monto: monto,
             monto_modificado:montoModificado,
             monto_original: cargoCatalogo.precio,
             co_curso:null,    
             texto_ayuda:``,
             genero:genero
        });      

         //actualizar totales adeuda en alumno
         //await alumnoDao.actualizarTotalAdeudaAlumno(idAlumno,genero);
         await cursoDao.actualizarTotalAdeudaAlumno(idAlumno,genero);
     
    
    return idRet;
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
    getCargoExtraMensualidadEmpresa,
    registrarColegiaturaAlumnoSemanaActual
}; 