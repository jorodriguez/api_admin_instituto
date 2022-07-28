const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const siUsuarioSucursalRolDao = new Dao(Tables.SI_USUARIO_SUCURSAL_ROL); 
const  SiUsuarioSucursalRol = require('../models/SiUsuarioSucursalRol');

const getAllRolesUsuario = async (idUsuario,idSucursal) => {
    console.log("@getAllRolesUsuario");
    return await genericDao.findAll(queryBase(), [idUsuario,idSucursal]);
};

const findRelacion = async (siUsuario,siRol,coSucursal,coEmpresa)=>{
    //se busca sin el eliminado debido a que se modifica ese valor
    return genericDao.findOne(`
                select usr.*
                from si_usuario_sucursal_rol usr 
                where usr.usuario = $1 
                        and usr.co_sucursal = $2                        
                        and usr.si_rol =  $3
                        and usr.co_empresa = $4
    `,[siUsuario,coSucursal,siRol,coEmpresa]);
}

const actualizarRol = async (data = {idRol,idUsuario,idSucursal,idEmpresa,idUsuarioGenero}) => {
    console.log("@actualizarRol");
    try {        

        //roles[{seleccionado,si_usuario_sucursal_rol}]
        const  {seleccionado,siRol,siUsuario,coSucursal,coEmpresa,idUsuarioGenero} = data;

        const registroRelacion = await findRelacion(siUsuario,siRol,coSucursal,coEmpresa);

        if(!registroRelacion){ //insertar
                const siUsuarioSucursalRol = new SiUsuarioSucursalRol();
                const insert = siUsuarioSucursalRol
                                    .setSiUsuario(siUsuario)
                                    .setCoEmpresa(coEmpresa)
                                    .setCoSucurssal(coSucursal)
                                    .setGenero(idUsuarioGenero)
                                    .build();
                
                await siUsuarioSucursalRolDao.insert(insert);        
        }else{
            //existe la relacion modificar el campo eliminado 
            const updateData = Object.assign(new SiUsuarioSucursalRol(),registroRelacion);
        
            const dataWillUpdate = updateData
                                    .setFechaModifico(new Date())
                                    .setModifico(idUsuarioGenero)
                                    .setEliminado(!seleccionado)
                                    .buildForUpdate();
    
               await siUsuarioSucursalRolDao.update(registroRelacion.id,dataWillUpdate);            

        }
        return true;
        
    }catch(error){
        console.log(error);
        return false;
    }
}

const queryBase = ()=>`
select (
        select usr.id 
        from si_usuario_sucursal_rol usr 
        where usr.usuario = $1 
            and usr.co_sucursal = $2 
            and usr.si_rol = rol.id 
            and usr.eliminado =false
        ) is not null as seleccionado,                
        rol.id as si_rol,
        rol.nombre,
        rol.descripcion
    from si_rol rol	 
    where rol.eliminado = false
`;





module.exports = {       
    getAllRolesUsuario,actualizarRol
    
};