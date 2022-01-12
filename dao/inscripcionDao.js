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

const confirmarInscripcion = async(idInscripcion,inscripcionData)=>{
  console.log("@confirmarInscripcion");
  const {confirmacion,nota,genero} = inscripcionData;

  return genericDao.execute(`
          UPDATE CO_INSCRIPCION 
            SET CONFIRMADO = $2,
                FECHA_CONFIRMADO = (getDate('')+getHora(''))::timestamp,
                FECHA_MODIFICO = (getDate('')+getHora(''))::timestamp,
                NOTA = $3,
                USUARIO_CONFIRMO = $4,                
                MODIFICO = $4
          WHERE id = $1 RETURNING ID;              
  `,[idInscripcion,confirmacion,nota,genero]);
}


const getInscripcionesAlumno = async(uidAlumno)=>{
  console.log("@guardarInscripcionesA1lumno"); 
  return await genericDao.findAll(getQueryBase(' a.uid = $1 '),[uidAlumno]);
}

const getInscripcionesActivasAlumno = async(uidAlumno)=>{
  console.log("@getInscripcionesActivasAlumno"); 
  return await genericDao.findAll(getQueryBase(' a.uid = $1 AND curso.activo = true'),[uidAlumno]);
}

const getInscripciones = async (idSucursal) => {
  console.log("@getInscripciones");
  return await genericDao.findAll(getQueryBase(' suc.id = $1 '),[idSucursal]
  );
};

const getInscripcionesSucursalCurso = async (idSucursal,idCurso) => {
  console.log("@getInscripcionesSucursalCurso");
  return await genericDao.findAll(getQueryBase(' suc.id = $1 AND curso.id = $2 '),[idSucursal,idCurso]
  );
};


const getInscripcionAlumnoCurso = async (idAlumno,idCurso) => {
  console.log("@getInscripciones");
  //return await genericDao.findOne(` select * from co_inscripcion where co_curso = and co_alumno = and eliminado = false; `,[idSucursal]);
  return genericDao.findOne(getQueryBase(" a.id = $1 and curso.id = $2 "),[idAlumno,idCurso]);
};

const actualizarCampoInscripcion = async (idInscripcion,idCargoInscripcion,genero) => {
  console.log("@actualizarCampoInscripcion"); 
  console.log("actualizer co_cargo_inscripcion de co_inscripcion idCArgo="+idCargoInscripcion); 
  return genericDao.execute(` UPDATE CO_INSCRIPCION 
                              SET co_cargo_inscripcion = $2,
                                   fecha_modifico = (getDate('')+getHora(''))::timestamp,
                                   modifico = $3
                              WHERE 
                                id=$1
                              returning id;`
          ,[idInscripcion,idCargoInscripcion,genero]);
};

const actualizarTotalAdeudaInscripcion = async (idAlumno,idCurso,genero) => {
  console.log("@actualizarTotalAdeudaInscripcion");  

  return genericDao.execute(` UPDATE CO_INSCRIPCION SET 
                                  total_adeuda = (select case when sum(total) is null then 0 else sum(total) end from co_cargo_balance_alumno where co_alumno = $1 and co_curso = $2 and eliminado = false),
                                  fecha_modifico = (getDate('')+getHora(''))::timestamp,
                                  modifico = $3
                            WHERE 
                                  co_alumno=$1 and co_curso = $2
                              returning id`
        ,[idAlumno,idCurso,genero]);
};





const getInscripcionesCurso = async (uidCurso)=>{
  console.log("@getIncripcionesCurso");
  
  return await genericDao.findAll(getQueryBase(" curso.uid = $1 "),[uidCurso]);
}

const getInscripcionesConfirmadasCurso = async (uidCurso)=>{
  console.log("@getInscripcionesConfirmadasCurso");
  
  //return await genericDao.findAll(getQueryBase(" curso.uid = $1 AND  i.confirmado "),[uidCurso]);
  return await genericDao.findAll(getQueryBase(" curso.uid = $1  "),[uidCurso]);
}

const getIncripcionesCursoIniciaHoy = async (idCurso)=>{
  console.log("@getIncripcionesIniciarCursoHoy id="+idCurso);  
  return await genericDao.findAll(getQueryBase(" curso.id = $1 and curso.fecha_inicio::date <= getDate('') and curso.semana_actual = 0 and curso.activo = false "),[idCurso]);
}

const getIncripcionesIniciarCursoHoyPorSucursal =(idSucursal)=>{
  console.log("@getIncripcionesIniciarCursoHoyPorSucursal");
  
  return genericDao.findAll(getQueryBase("  curso.fecha_inicio::date <= getDate('') and a.co_sucursal = $1 and curso.semana_actual = 0  and curso.activo = false "),[idSucursal]);
}



const getQueryBase = (criterio) => `               
  select i.id as id_inscripcion,
    curso.id as id_curso,
    curso.uid as uid_curso,
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
    (select string_agg(nombre,'-') from cat_dia where id = ANY(curso.dias_array::int[])) as dias, 
    i.costo_colegiatura,
    i.costo_inscripcion,
    i.nota as nota_inscripcion,
    i.total_pagado,
    i.pagado,
    esp.id as id_especialidad,
    esp.nombre as especialidad,
    esp.color as color_especialidad, 
    horario.id as id_horario,	 
    horario.nombre as horario,
    a.id as id_alumno,
    a.nombre as alumno,
    a.apellidos,
    a.foto,
    a.uid,
    i.confirmado,
    to_char(i.fecha_confirmado,'DD-MM-YYYY HH:MM') as fecha_confirmado,
    (select nombre from usuario where id = i.usuario_confirmo) as usuario_confirmo,
    curso.foto as foto_curso,
    curso.activo
from co_inscripcion i inner join co_curso curso on curso.id = i.co_curso
    inner join cat_especialidad esp on esp.id = curso.cat_especialidad    
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
  actualizarCampoInscripcion,
  actualizarTotalAdeudaInscripcion,
  getInscripcionAlumnoCurso,
  getIncripcionesIniciarCursoHoyPorSucursal,
  getIncripcionesCursoIniciaHoy,
  confirmarInscripcion,
  guardarInscripcion,
  getInscripcionesAlumno,
  getInscripcionesCurso,
  getInscripcionesConfirmadasCurso,
  getInscripcionesActivasAlumno,
  getInscripcionesSucursalCurso
};
