const gastoDao = require('../dao/gastoDao');
const cortesDao = require('../dao/cortesDao');
const utilDao = require('../dao/utilDao');
const sucursalDao = require('../dao/sucursalDao');
const templateService = require('./templateService');
const temaNotificacionService  = require('./temaNotificacionService');
const correoService = require('../utils/CorreoService');
const {TEMPLATES,TEMA_NOTIFICACION,USUARIO_DEFAULT, TIPO_TEMPLATE} = require('../utils/Constantes');

const getCorteDiaSucursal = async (corteData) => {
    console.log("@getCorteDiaSucursal");
    
    const {idSucursal,fecha,idUsuario} = corteData;
        
    const sumaIngreso = await cortesDao.getSumaPagosPorRango({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const resultsIngreso = await cortesDao.getDetallePagos({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const sumaGastos = await gastoDao.getGastosSumaCortePorSucursal({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    const resultsGastos = await gastoDao.getGastosCortePorSucursal({idSucursal:parseInt(idSucursal),fechaInicio:fecha,fechaFin:fecha});

    console.log("Fecha "+fecha);
    console.log("suc "+idSucursal);
    console.log("sumaIngreso "+sumaIngreso.total);
    console.log("sumaGastos "+sumaGastos.total);
    
    return {
            fecha:fecha,
            totalIngreso: (sumaIngreso ? sumaIngreso.total : 0),detalleIngreso:resultsIngreso,
            totalGasto:(sumaGastos ? sumaGastos.total : 0), detalleGasto:resultsGastos
           };
};


const getHtmlCorteDiaSucursal = async (corteData)=>{
    console.log("@getHtmlCorteDiaSucursal");
    
    const corte = await getCorteDiaSucursal(corteData);

    const {idSucursal} = corteData;
    const sucursal =  await sucursalDao.getSucursalPorId(idSucursal);    

   //leer el template
   const params = {
        dia_corte:corte.fecha,
        total_ingreso:corte.totalIngreso ,
        total_gasto:corte.totalGasto ,
        total_caja: (corte.totalIngreso-corte.totalGasto),
        nombre_sucursal:sucursal.nombre,
        direccion_sucursal:sucursal.direccion,
        telefono_sucursal:sucursal.telefono
   };

   const html = await  templateService
   .loadTemplateEmpresa({
           params:params,
           idEmpresa:sucursal.co_empresa,
           idUsuario:corteData.idUsuario,
           tipoTemplate:corteData.tipoTemplate //TIPO_TEMPLATE.CORTE_DIARIO
       });
    console.log(`html Corte ${html}`);
      
    return html;
};
/*
const getHtmlCorteDiaSucursalEnvioCorreo = async (corteData)=>{
    console.log("@getHtmlCorteDiaSucursalEnvioCorreo");
    
    const corte = await getCorteDiaSucursal(corteData);

    const {idSucursal} = corteData;
    const sucursal =  await sucursalDao.getSucursalPorId(idSucursal);    

   //leer el template
   const params = {
        dia_corte:corte.fecha,
        total_ingreso:corte.totalIngreso ,
        total_gasto:corte.totalGasto ,
        total_caja: (corte.totalIngreso-corte.totalGasto),
        nombre_sucursal:sucursal.nombre,
        direccion_sucursal:sucursal.direccion,
        telefono_sucursal:sucursal.telefono
   };
   const html = await  templateService
   .loadTemplateEmpresa({
           params:params,
           idEmpresa:sucursal.co_empresa,
           idUsuario:corteData.idUsuario,
           tipoTemplate:TIPO_TEMPLATE.CORTE_DIARIO_ENVIO_CORREO
       });
      
    return html;
};*/




const enviarCorteEmpresaCorreo = async (corteData)=>{
    console.log("@enviarCorteEmpresaCorreo");
   
    // enviar junto todos los cortes de las sucursales de la empresa por c
    const {coEmpresa} = corteData;

    const informacionFecha = await utilDao.getFechaHoy();

    console.log(`enviado corte de ${JSON.stringify(informacionFecha)}`)

    const fechaHoy = new Date(`${informacionFecha.fecha_actual_format} 00:00:00`);
    
    console.log("FECHA "+fechaHoy)

    //obtener los usuarios de la empresa de usuario notificacion    
    const usuariosEnviar = await temaNotificacionService.getCorreosTemaPorEmpresa({coEmpresa:coEmpresa,coTemaNotificacion:TEMA_NOTIFICACION.ID_TEMA_CORTE_DIARIO})

    if(usuariosEnviar == null && usuariosEnviar.length == 0){
            console.log("CORREO NO ENVIADO -  NO HAY USUARIOS EN CO_CORREO_TEMA_NOTIFICACION");
            return ;
    }
    
    //obtener las sucursales de la empresa
    const listaSucursales = await sucursalDao.getSucursalPorEmpresa(coEmpresa);    
    
    if(listaSucursales == null && listaSucursales.length == 0){
        console.log("CORREO NO ENVIADO -  NO HAY SUCURSALES DE LA EMPRESA "+coEmpresa);
        return ;
    }
    
  //  let corteSucursales=[];
    let html = `<p><strong>Corte correspondiente al día ${informacionFecha.fecha_actual_asunto}</strong></p> 
                <p><small>Enviado ${informacionFecha.fecha_actual_asunto} ${informacionFecha.hora_actual_format}</small></p>` ;
    
    for(let i =0; i< listaSucursales.length;i++){
        const sucursal = listaSucursales[i];

        console.log(`===== SUCURSAL ${sucursal.nombre}===== `)
           
        const htmlGen = await getHtmlCorteDiaSucursal(
                    {   idUsuario:USUARIO_DEFAULT ,
                        idSucursal:sucursal.id,
                        fecha:fechaHoy,
                        tipoTemplate: TIPO_TEMPLATE.CORTE_DIARIO_ENVIO_CORREO
                    }
                    );            
        
        html = html.concat(htmlGen);       
                
//        corteSucursales.push({sucursal,html});

    }   
    
    console.log(`${html}`)

    let infoEnvio = {enviado:'pendiente'};
    //enviar correo
    //if(html){
        let asunto = `Corte del ${informacionFecha.fecha_actual_asunto}`;
        let para = usuariosEnviar.correos_usuarios || [];        

        console.log(`usuariosEnviar ${JSON.stringify(usuariosEnviar)}`)

        let cc = usuariosEnviar.correos_copia || [];
        
        const htmlMergeTemplateMain = await templateService.loadAndMergeHtmlTemplateEmpresa({
                             params:{},
                             html:html,
                             idEmpresa:coEmpresa
            
         });        

        infoEnvio = await correoService.enviarCorreoAsync({para:para,cc:cc,asunto:asunto,html:htmlMergeTemplateMain,idEmpresa:coEmpresa});

        console.log("=== ENVIO DE CORTE =="+ JSON.stringify(infoEnvio))
        console.log("======= ENVIO DE CORREO =====");
    //}

    return infoEnvio;

};



module.exports = {
    getCorteDiaSucursal,
    getHtmlCorteDiaSucursal,
    enviarCorteEmpresaCorreo
};


