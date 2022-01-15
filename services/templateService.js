
const mustache = require('mustache');
const templateCorreoDao = require("../dao/templateCorreoDao");

const loadTemplateReciboPago = async(params,idEmpresaParam) => {    
    let html = '';
    try {                  
        const template = await templateCorreoDao.getTemplateReciboPago(idEmpresaParam);        
        if(template){
                console.log("template encontrado "+template.nombre_empresa);
                //let htmlTemp = '';
                //htmlTemp = htmlTemp.concat(template.encabezado_template, (htmlDataTemplateFile || ''), template.pie_template);                            
                params.nombre_empresa = template.nombre_empresa;
                params.direccion_empresa = template.direccion_empresa;
                params.rfc = template.rfc;                
                params.logotipo = template.logotipo;                
                html = mustache.to_html(template.template_recibo_pago, params);                        
        }
        return html;
    } catch (e) {
        console.log("Error al obtener el template de la BD "+e);
        throw "error al obtener el template ";
    }      
};



module.exports = {
    loadTemplateReciboPago
};
