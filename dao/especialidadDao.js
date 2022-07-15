const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");

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
        e.descripcion
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
  getEspecialidad
};
