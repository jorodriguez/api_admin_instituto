const correoService = require('./CorreoService');
const templateService = require('../services/templateService');
const temaNotificacionService = require('../services/temaNotificacionService');
const {TIPO_TEMPLATE,TEMA_NOTIFICACION} = require('./Constantes');
const usuarioDao = require('../dao/usuarioDao');
const sucursalDao = require('../dao/sucursalDao');

const enviarCorreoBienvenida = async (data = {id_usuario,clave,genero}) => {    
try{
   
    const {id_usuario,clave,genero} = data; 

   const usuario = await usuarioDao.findById(id_usuario);

   if(!usuario){
       console.log("No se encontro el usuario");
        return;
   }

    const sucursal = await sucursalDao.getSucursalPorId(usuario.co_sucursal);

    //const usuarioGenero = await usuarioDao.findById(genero);
   
    const params = {        
        nombre: usuario.nombre,        
        alias: usuario.alias,        
        nombre_sucursal: sucursal.nombre,
        correo: usuario.correo,                        
        hora_entrada: usuario.hora_entrada,
        hora_salida: usuario.hora_salida,
        clave: clave,
        ver_clave:true
    };

    const templateHtml = await templateService.loadTemplateEmpresa({params,
                                        idEmpresa:usuario.co_empresa,
                                        idUsuario:genero,
                                        tipoTemplate:TIPO_TEMPLATE.BIENVENIDA_EMPLEADO});
        
    const asunto = `Bienvenido(a) ${usuario.nombre}`;
    
    const para =  [usuario.correo];

    /*if(usuarioGenero.correo_copia != null){
        para.push(usuarioGenero.correo_copia);
    }
    const usuariosTema = await temaNotificacionService.getCorreosPorTemaSucursal(
                                {
                                    coSucursal:co_sucursal,
                                    coTemaNotificacion:TEMA_NOTIFICACION.ID_TEMA_ALTA_ALUMNO
                                }
                       );
    
    let copia = [].concat(usuariosTema.correos_usuarios || []).concat(usuariosTema.correos_copia || []);

    console.log("correo copia "+copia);
   
    const cc = copia;
    */

    const cc = '';

    await correoService.enviarCorreoAsync({para, cc:cc, asunto:asunto, html:templateHtml,idEmpresa:co_empresa});

    }catch(e){
        
        console.log("Error al enviar el correo de bienvenida del usuario "+e);

    }

};

module.exports = {
    enviarCorreoBienvenida
};