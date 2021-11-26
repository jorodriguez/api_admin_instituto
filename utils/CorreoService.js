
const nodemailer = require('nodemailer');
const mustache = require('mustache');
var fs = require('fs').promises;
var path = require('path');
//const configEnv = require('../config/configEnv');
//const { QUERY, getQueryInstance } = require('../services/sqlHelper');
//const { ID_EMPRESA_DEFAULT } = require('./Constantes');
const correoTemaService = require('../domain/temaNotificacionService');
const sucursalService = require('../domain/sucursalService');
const templateCorreoService = require('../domain/templateCorreoService');
const configuracionService = require('../domain/configuracionService');

const { existeValorArray } = require('./Utils');

const TEMPLATES = {
    TEMPLATE_AVISO: "aviso.html",
    TEMPLATE_GENERICO: "generico.html",
    TEMPLATE_RECIBO_PAGO: "recibo_pago.html",
    TEMPLATE_AVISO_CARGO: "aviso_cargo.html",
    TEMPLATE_DATOS_FACTURACION: "datos_factura.html",
    TEMPLATE_RECORDATORIO_PAGO_MENSUALIDAD: "recordatorio_recargo_mensualidad.html",
    TEMPLATE_REPORTE_PROX_RECARGOS: "reporte_prox_recargo_mensualidad.html",
    TEMPLATE_ESTADO_CUENTA: "estado_cuenta.html"
};


function enviarCorreoFamiliaresAlumno(asunto, para, cc, params,idEmpresa, template) {

    enviarCorreoTemplate(para, cc, asunto, params,idEmpresa, template);

}


const enviarCorreoConCopiaTemaNotificacion = async (asunto, para, idSucursalTemaCopia, idTemaNotificacion, params, template) => {
    console.log("@enviarCorreoPorTemaNotificacion copia a la suc " + idSucursalTemaCopia + " tema " + idTemaNotificacion);
    try {
        const sucursal = await sucursalService.getSucursalPorId(idSucursalTemaCopia);
        console.log(JSON.stringify(sucursal));
        let renderHtml = await loadTemplate(template, params,sucursal.co_empresa);        
        let cc = await obtenerCorreosCopiaPorTema(idSucursalTemaCopia, idTemaNotificacion);
        enviarCorreo(para, cc, asunto, renderHtml,sucursal.co_empresa);        
    } catch (error) {
        console.log("Excepción en el envio de correo : " + error);
    }
};


const enviarCorreoParaTemaNotificacion = async (asunto, idSucursalTemaCopia, idTemaNotificacion, params, template)=> {
    console.log("@enviarCorreoParaTemaNotificacion");
    try{
        const sucursal = await sucursalService.getSucursalPorId(idSucursalTemaCopia);
        let renderHtml = await loadTemplate(template, params,sucursal.co_empresa);  
        let para = await obtenerCorreosCopiaPorTema(idSucursalTemaCopia, idTemaNotificacion);
        if (existeValorArray(para)) {
            enviarCorreo(para, "", asunto, renderHtml,sucursal.co_empresa);
            //await enviarCorreoTemplateAsync(para,"",asunto,)
        }else{
            console.log("   X X X X Xno se envio el correo no hay para X X X X ");
        }
    } catch (error) {
        console.log("Excepción en el envio de correo : " + error);
    }
   /* loadTemplate(template, params)
        .then((renderHtml) => {
            obtenerCorreosCopiaPorTema(idSucursalTemaCopia, idTemaNotificacion)
                .then(correosCopia => {
                    let para = correosCopia;
                    if (existeValorArray(para)) {
                        enviarCorreo(para, "", asunto, renderHtml);
                    } else {
                        console.log("No existen correo para enviar el mail ");
                    }

                });

        }).catch(e => {
            console.log("Excepción en el envio de correo : " + e);
        });*/
};


function enviarCorreoTemplate(para, cc, asunto, params, idEmpresa,template,handler) {
    console.log("@enviarCorreoTemplate");

    loadTemplate(template, params,idEmpresa)
        .then((renderHtml) => {

            enviarCorreo(para, cc, asunto, renderHtml,idEmpresa,handler);

        }).catch(e => {
            console.log("Excepción en el envio de correo : " + e);
        });
}

const enviarCorreoTemplateAsync = async (para, cc, asunto, params,idEmpresa, template) => {
    console.log("@enviarCorreoTemplateAsync");

   const renderHtml = await loadTemplate(template,params,idEmpresa);

   return new Promise((resolve,reject)=>{
      enviarCorreo(para, cc, asunto, renderHtml,idEmpresa,(error,info)=>{
            if(error){
                    reject({enviado:false,mensaje:error});
            }else{
                    resolve({enviado:true,mensaje:info});
            }
      });    
    });
};

const getHtmlPreviewTemplate = async (templateName, params,idEmpresa) => {
    return await loadTemplate(templateName, params,idEmpresa);
};

const loadTemplate = async(templateName, params,idEmpresaParam) => {
    console.log("LOAD TEMPLATE EMPRESA = "+idEmpresaParam);
    let html = '';
    try {                  
        const template = await templateCorreoService.getTemplateCorreoEmpresa(idEmpresaParam);
        const htmlDataTemplateFile = await fs.readFile(path.resolve(__dirname, "../templates/" + templateName), 'utf8');                                        
        if(template && htmlDataTemplateFile){
                console.log("template encontrado "+template.nombre_empresa);
                let htmlTemp = '';
                htmlTemp = htmlTemp.concat(template.encabezado_template, (htmlDataTemplateFile || ''), template.pie_template);                            
                params.nombre_empresa = template.nombre_empresa;
                params.anexo_pie_correo = template.anexo_pie_correo;
                params.logotipo = template.logotipo;
                params.anexo_recibo_pago = (templateName == TEMPLATES.TEMPLATE_RECIBO_PAGO) ? (template.anexo_recibo_pago || '') : '';
                html = mustache.to_html(htmlTemp, params);                        
        }
        return html;
    } catch (e) {
        console.log("Error al obtener el template de la BD "+e);
        throw "error al obtener el template ";
    }    
    //se dejo de esta forma por que moustache no soporta async/await
  /* return new Promise((resolve, reject) => {
        try {
            params.nombre_empresa = '';
            getQueryInstance(QUERY.TEMPLATE_EMPRESA, [idEmpresaParam])
                .then((rowTemplate) => {
                    console.log("TEMPLATE ENCONTRADO EN LA BD");
                    if (rowTemplate.rowCount > 0) {
                        let row = rowTemplate.rows[0];                    
                        fs.readFile(path.resolve(__dirname, "../templates/" + templateName), 'utf8', (err, data) => {
                            params.nombre_empresa = row.nombre_empresa;
                            let htmlTemp = '';
                            htmlTemp = htmlTemp.concat(row.encabezado, (data || ''), row.pie);                            
                            html = mustache.to_html(htmlTemp, params);
                            resolve(html);
                        });
                    } else {
                        fs.readFile(path.resolve(__dirname, "../templates/" + templateName), 'utf8', (err, data) => {                                                        
                            html = mustache.to_html(data, params);
                            resolve(html);
                        });
                    }
                }).catch((e) => {
                    //leer template de archivos
                    console.log("Error al obtener el template de la BD");
                    reject(e);
                });
        } catch (e) {
            reject(e);
        }
    });*/
};

function obtenerCorreosCopiaPorTema(co_sucursal, id_tema) {
    return correoTemaService.obtenerCorreosPorTema(co_sucursal, id_tema);
}


const enviarCorreo = async (para, conCopia, asunto, renderHtml,idEmpresa,handler) =>{
    console.log("Para " + para);
    console.log("CC " + conCopia);
    console.log("CC " + idEmpresa);
    try {
        if (para == undefined || para == '' || para == null) {
            console.log("############ NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para,cc)######");
            return;
        }
        if (conCopia == undefined || conCopia == '' || conCopia == null) {
            conCopia = "";
        }

        if (renderHtml != null) {

            const configuracionEmpresa = await configuracionService.getConfiguracionEmpresa(idEmpresa);
            console.log("== CONFIGURACION CORREO EMPRESA "+JSON.stringify(configuracionEmpresa));
            const configMail = JSON.parse(configuracionEmpresa.configuracion_correo);

            const mailData = {
                from: configuracionEmpresa.remitente_from,               
                to: para,
                cc: conCopia,
                subject: asunto,
                html: renderHtml
            };

            console.log(`Sender FROM ${configuracionEmpresa.remitente_from}`);
            console.log(`Empresa ${configuracionEmpresa.nombre}`);
            console.log("Correo para " + para);
            console.log("Correo cc " + JSON.stringify(conCopia));
            console.log("Asunto " + asunto);           
            console.log(`EMAIL_CONFIG ${JSON.stringify(configMail)}`);
            

            const transporter = nodemailer.createTransport(configMail);
           
            const handlerMail =  handler ? handler : (error, info) => {
                if (error) {
                    console.log("Error al enviar correo : " + error);
                } else {
                    console.log('CORREO ENVIADO ======>>>: ' + info.response);
                }
            };

            transporter.sendMail(mailData, handlerMail);
            
            transporter.close();
        } else {
            console.log("No se envio el correo, no existe HTML");
        }
    } catch (e) {
        console.log("ERROR AL ENVIAR EL CORREO " + e);
    }
}

//Esta configuracion se cambiara, se usara el API dedicado
/*
function enviarCorreo(para, conCopia, asunto, renderHtml,handler) {
    console.log("Para " + para);
    console.log("CCC " + conCopia);
    try {
        if (para == undefined || para == '' || para == null) {
            console.log("############ NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para,cc)######");
            return;
        }
        if (conCopia == undefined || conCopia == '' || conCopia == null) {
            conCopia = "";
        }

        if (renderHtml != null) {

            const mailOptions = configEnv.EMAIL_CONFIG ? configEnv.EMAIL_CONFIG.mailOptions : {};
            const configMail = configEnv.EMAIL_CONFIG ? configEnv.EMAIL_CONFIG.configMail : {};

            const mailData = {
                from: mailOptions.from || '',
                //from: variables.mailOptions.from,
                to: para,
                cc: conCopia,
                subject: asunto,
                html: renderHtml
            };

            console.log(`Sender FROM ${mailOptions.from || 'NO-FROM'}`);
            console.log("Correo para " + para);
            console.log("Correo cc " + JSON.stringify(conCopia));
            console.log("Asunto " + asunto);
            console.log(`Ambiente ${configEnv.ENV}`);
            console.log(`EMAIL_CONFIG ${JSON.stringify(configEnv.EMAIL_CONFIG)}`);
            console.log(`configMail ${configMail}`);

            const transporter = nodemailer.createTransport(configMail);
            //const transporter = nodemailer.createTransport(variables.configMail);

            const handlerMail =  handler ? handler : (error, info) => {
                if (error) {
                    console.log("Error al enviar correo : " + error);
                } else {
                    console.log('CORREO ENVIADO ======>>>: ' + info.response);
                }
            };

            transporter.sendMail(mailData, handlerMail);
            
            transporter.close();
        } else {
            console.log("No se envio el correo, no existe HTML");
        }
    } catch (e) {
        console.log("ERROR AL ENVIAR EL CORREO " + e);
    }
}*/

/*
const enviarCorreoAsync = async (para, conCopia, asunto, renderHtml) =>{
    console.log("Para " + para);
    console.log("CCC " + conCopia);
    try {
        
           recipientesCorrectos(para,conCopia,renderHtml);

           const config = getMailConfig();
        
           const mailData = getMailData(para,conCopia,asunto,renderHtml);          

           const transporter = nodemailer.createTransport(config);            
          
           const respuestaEnvio = await transporter.sendMail(mailData);
            
           transporter.close();        

           return respuestaEnvio;
    } catch (e) {
        console.log("ERROR AL ENVIAR EL CORREO " + e);
    }
};

const recipientesCorrectos = (para,cc,html)=>{

    if (para == undefined || para == '' || para == null) {
        console.log("############ NO EXISTEN CORREOS EN NINGUN CONTENEDOR (para,cc)######");
        throw 'NO EXISTEN CORREOS EN EN NINGUN CONTENEDOR';        
    }

    if (cc == undefined || cc == '' || cc == null) {
        cc = "";
    }
    
    if (html == null) {
         throw 'NO EXISTEN EL HTML';        
    }    

    return true;
};

const getMailData =(para,cc,asunto,html)=>{
    
    const mailOptions = configEnv.EMAIL_CONFIG ? configEnv.EMAIL_CONFIG.mailOptions : {};    
    cc = cc ? cc : "";      
    
    const mailData = {
        from: mailOptions.from || '',    
        to: para,
        cc: cc,
        subject: asunto,
        html: html
    }; 

    console.log(`Sender FROM ${mailOptions.from || 'NOT-FROM'}`);
    console.log("Correo para " + para);
    console.log("Correo cc " + JSON.stringify(cc));    
        
    return mailData;
};

const getMailConfig = ()=>{
    
    try{
        const congigMail =  configEnv.EMAIL_CONFIG ? configEnv.EMAIL_CONFIG.configMail : {};
    
        console.log(`Ambiente ${configEnv.ENV}`);    
        console.log(`EMAIL_CONFIG ${JSON.stringify(congigMail)}`);

        return configMail;
    }catch(e){
        console.log("Error al leer la configuracion del email");
        return {};
    }
};*/

module.exports = {
    TEMPLATES,
    enviarCorreoConCopiaTemaNotificacion,
    enviarCorreoParaTemaNotificacion,
    enviarCorreo,
    enviarCorreoTemplate,
    enviarCorreoFamiliaresAlumno,
    getHtmlPreviewTemplate,
    enviarCorreoTemplateAsync
};