const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");



const guardarInscripcion = async(idAlumno,inscripcionData)=>{
  console.log("@guardarInscripcion");
  const {co_curso,co_empresa,co_sucursal,co_alumno,costo_colegiatura,costo_inscripcion,nota,genero} = inscripcionData;

  return genericDao.execute(`
          INSERT INTO CO_INSCRIPCION(co_curso,co_empresa,co_sucursal,co_alumno,costo_colegiatura,costo_inscripcion,nota,genero)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ID;
  `[co_curso,co_empresa,co_sucursal,idAlumno,costo_colegiatura,costo_inscripcion,nota,genero]);
}

const getInscripciones = async (idSucursal) => {
  console.log("@getInscripciones");

  return await genericDao.findAll(
      `               
      select i.id as id,
        curso.id as id_curso,
        curso.fecha_inicio_previsto,
        curso.fecha_fin_previsto,	  
        esp.id as id_especialidad,
        esp.nombre as especialidad,
        esp.color as color_especialidad,
        dias.id as id_dias,
        dias.nombre as dias, 
        horario.id as id_horario,	 
        horario.nombre as horario,
        a.id as id_alumno,
        a.nombre as alumno,
        a.apellidos,
        a.foto	  
    from co_inscripcion i inner join co_curso curso on curso.id = i.co_curso
          inner join cat_especialidad esp on esp.id = curso.cat_especialidad
          inner join cat_dia dias on dias.id = curso.cat_dia				
          inner join cat_horario horario on horario.id = curso.cat_horario
          inner join co_alumno a on a.id = i.co_alumno
          inner join co_sucursal suc on suc.id = i.co_sucursal
    where suc.id = $1
        and i.eliminado = false
        and curso.eliminado = false
    order by i.fecha_genero desc
      `,[idSucursal]
  );
};

module.exports = {
  getInscripciones,
  guardarInscripcion
};
