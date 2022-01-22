
const mustache = require('mustache');
const templateCorreoDao = require("../dao/templateCorreoDao");
const usuarioDao = require("../dao/usuarioDao");
const {TIPO_TEMPLATE} = require("../utils/Constantes");

const loadTemplateEmpresa = async(templateData = {params,idEmpresa,idUsuario,tipoTemplate}) => {    
    let html = '';
    try {                  

        const {params,idEmpresa,idUsuario,tipoTemplate} = templateData;
        let paramsSend = {...params};

        const template = await templateCorreoDao.getTemplateEmpresa(idEmpresa);        
        if(template){
                console.log("template encontrado "+template.nombre_empresa);
                //const template = await templateCorreoDao.getTemplateCorreoEmpresa(idEmpresaParam);        
                const usuarioImprime = await usuarioDao.findById(idUsuario);
                
                paramsSend.nombre_empresa = template.nombre_empresa;                
                paramsSend.usuario_imprime = usuarioImprime.nombre;
                paramsSend.fecha_impresion = template.fecha_impresion;                
                paramsSend.direccion_empresa = template.direccion_empresa;
                paramsSend.rfc = template.rfc;                
                paramsSend.logotipo = template.logotipo;                

                switch(tipoTemplate){
                    case TIPO_TEMPLATE.RECIBO_PAGO:
                            html = mustache.to_html(template.template_recibo_pago, paramsSend);
                    break;
                    case TIPO_TEMPLATE.CORTE_DIARIO:
                            html = mustache.to_html(template.template_corte_dia, paramsSend);
                    break;
                }
                
        }
        return html;
    } catch (e) {
        console.log("Error al obtener el template de la BD "+e);
        throw "error al obtener el template ";
    }      
};




module.exports = {
    loadTemplateEmpresa
};
