const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const especialidadDao = new Dao(Tables.CAT_CATEGORIA); 
const CatEspecialidad = require('../models/CatEspecialidad');

const createEspecialidad = async (data) => {
  console.log("@createEspecialidad");
  try {
      
    const dataCreate = Object.assign(new CatEspecialidad(),data);

    return await especialidadDao.insert(dataCreate.build());        
      
  }catch(error){
      console.log(error);
      return false;
  }
}

const updateEspecialidad = async (id,data) => {
  console.log("@updateEspecialidad = "+id);  

  console.log(JSON.stringify(data));
  
  const dataUpdate = Object.assign(new CatEspecialidad(),data);

  const dataWillUpdate = dataUpdate.setFechaModifico(new Date()).setModifico(data.genero).buildForUpdate();

  const row = await categoriaDao.update(id,dataWillUpdate);
  
  return row ? row[0]:null;
}


const deleteEspecialidad = async (id,data) => {
  console.log("@deletecategoria");
  try {

      const dataDel = Object.assign(new CatEspecialidad(),data);

      const dataWillDelete = dataDel.setFechaModifico(new Date()).setModifico(data.genero).buildForDelete();
  
      const row = await categoriaDao.update(id,dataWillDelete);
      
      return row ;
      
  }catch(error){
      console.log(error);
      return false;
  }
}


const getEspecialidad = async (idEmpresa,idSucursal) => {
  console.log("@getEspecialidad");

  return await genericDao.findAll(
      `              
      select e.id,
        e.nombre,
        e.duracion,
        d.nombre as nombre_duracion,
        e.alumnos_permitidos,
        e.foto,
        e.color,
        e.descripcion,
        d.nombre as duracion
      from cat_especialidad e inner join cat_duracion d on d.id = e.cat_duracion
      where e.activo = true
          and e.co_empresa = $1
          and e.co_sucursal = $2
          and e.eliminado = false
      order by e.nombre       
      `,
    [idEmpresa,idSucursal]
  );
};



module.exports = {
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
  getEspecialidad
};
