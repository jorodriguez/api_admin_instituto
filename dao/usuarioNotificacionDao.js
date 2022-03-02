const genericDao = require('./genericDao');
const { TIPO_USUARIO } = require('../utils/Constantes');

const obtenerCorreosPorTema = async (data)=> {

    const {coEmpresa,coTemaNotificacion} = data;

    return await genericDao.findOne(`
    SELECT 
    (
        SELECT coalesce(array_to_json(array_agg(to_json(u.correo))),'[]'::json)
            FROM co_usuario_notificacion un inner join usuario u on u.id = un.usuario                        							 
                                        inner join co_sucursal suc on suc.id = un.co_sucursal
            WHERE suc.co_empresa = $1 and un.co_tema_notificacion = $2
            and un.eliminado = false and u.eliminado = false and suc.eliminado = false
    )    
    AS correos_usuarios,	
    (                
        SELECT coalesce(array_to_json(array_agg(to_json(cc.correo))),'[]'::json)
        FROM co_correo_copia_notificacion cc inner join co_sucursal suc on suc.id = cc.co_sucursal
        WHERE suc.co_empresa = $1 and cc.co_tema_notificacion = $2 and cc.eliminado = false and suc.eliminado = false                    
    )
    AS correos_copia      
`, [coEmpresa,coTemaNotificacion]);
}

const obtenerCorreosPorTemaSucursal = async (data)=> {

    const {coSucursal,coTemaNotificacion} = data;

    return await genericDao.findOne(`
    SELECT 
    (
        SELECT coalesce(array_to_json(array_agg(to_json(u.correo))),'[]'::json)
            FROM co_usuario_notificacion un inner join usuario u on u.id = un.usuario                        							 
                                        inner join co_sucursal suc on suc.id = un.co_sucursal
            WHERE suc.id = $1 and un.co_tema_notificacion = $2
            and un.eliminado = false and u.eliminado = false and suc.eliminado = false
    )    
    AS correos_usuarios,	
    (                
        SELECT coalesce(array_to_json(array_agg(to_json(cc.correo))),'[]'::json)
        FROM co_correo_copia_notificacion cc inner join co_sucursal suc on suc.id = cc.co_sucursal
        WHERE suc.id = $1 and cc.co_tema_notificacion = $2 and cc.eliminado = false and suc.eliminado = false                    
    )
    AS correos_copia      
`, [coSucursal,coTemaNotificacion]);
}



module.exports = {
    obtenerCorreosPorTema,obtenerCorreosPorTemaSucursal
};

