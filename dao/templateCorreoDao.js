const genericDao = require('./genericDao');

const getTemplateCorreoEmpresa = async (idEmpresa) => {
    console.log("@getTemplateCorreoEmpresa");
    return await genericDao.findOne(
    `select em.nombre as nombre_empresa,
            em.direccion as direccion_empresa,
            em.telefono as telefono_empresa,		
            tem.nombre as nombre_template,
            tem.encabezado as encabezado_template,
            tem.pie as pie_template,
            tem.anexo_pie_correo,
            tem.anexo_recibo_pago,
            tem.logo_correo as logotipo,
			em.pagina_oficial
    from co_empresa em inner join co_template tem on tem.id = em.co_template
        where em.id = $1
        and  em.activa = true 
        and em.eliminado = false
    `, [idEmpresa]);
};


module.exports = {
    getTemplateCorreoEmpresa
};