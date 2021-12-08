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
  `,[co_curso,co_empresa,co_sucursal,idAlumno,costo_colegiatura,costo_inscripcion,nota,genero]);
}

const getInscripcionesAlumno = async(uidAlumno)=>{
  console.log("@guardarInscripcionesA1lumno"); 
  return await genericDao.findAll(getQueryBase(' a.uid = $1 '),[uidAlumno]);
}

const getInscripciones = async (idSucursal) => {
  console.log("@getInscripciones");
  return await genericDao.findAll(getQueryBase(' suc.id = $1 '),[idSucursal]
  );
};


const getQueryBase = (criterio) => `               
select i.id as id,
  curso.id as id_curso,
  curso.semana_actual,	  
  esp.duracion as duracion_curso,
  curso.fecha_inicio_previsto,  
  to_char(curso.fecha_inicio_previsto,'DD-MM-YYYY') as fecha_inicio_previsto,
  to_char(curso.fecha_inicio_previsto,'DD Mon YY') as fecha_inicio_previsto_format,          
  to_char(curso.fecha_fin_previsto,'DD-MM-YYYY') as fecha_inicio_previsto,
  to_char(curso.fecha_fin_previsto,'DD Mon YYYY') as fecha_inicio_previsto_format,
  to_char(curso.fecha_inicio,'DD-MM-YYYY') as fecha_inicio,
  to_char(curso.fecha_inicio,'DD Mon YY') as fecha_inicio_format,          
  to_char(curso.fecha_fin,'DD-MM-YYYY') as fecha_fin,
  to_char(curso.fecha_fin,'DD Mon YY') as fecha_fin_format,          
  to_char(i.fecha_genero,'DD Mon YY hh:mm') as fecha_inscripcion_format,          
  i.costo_colegiatura,
  i.costo_inscripcion,
  i.nota as nota_inscripcion,
  i.total_pagado,
  i.pagado,
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
  a.foto,
  a.uid,
  curso.foto as foto_curso	  
from co_inscripcion i inner join co_curso curso on curso.id = i.co_curso
    inner join cat_especialidad esp on esp.id = curso.cat_especialidad
    inner join cat_dia dias on dias.id = curso.cat_dia				
    inner join cat_horario horario on horario.id = curso.cat_horario
    inner join co_alumno a on a.id = i.co_alumno
    inner join co_sucursal suc on suc.id = i.co_sucursal
where ${criterio}
  and i.eliminado = false
  and curso.eliminado = false
order by i.fecha_genero desc
`;

module.exports = {
  getInscripciones,
  guardarInscripcion,
  getInscripcionesAlumno
};