const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");


const createCurso = async (cursoData) => {
  console.log("@dao.createCurso");    
  try{
    
    const {
      cat_especialidad,      
      dias_array,
      cat_dia,
      //cat_horario,
      hora_inicio,
      hora_fin,
      co_empresa,
      co_sucursal,
      costo_colegiatura_base,
      costo_inscripcion_base,
      nota,
      fecha_inicio_previsto,
      numero_semanas,
      genero    
    } = cursoData;

    console.log(JSON.stringify(cursoData));

    const especialidad = await genericDao.findOne("SELECT * FROM cat_especialidad where id = $1",[cat_especialidad]);

    const id =  await genericDao.execute(`
          insert into co_curso(cat_especialidad,cat_dia,hora_inicio,hora_fin,co_empresa,costo_colegiatura_base,costo_inscripcion_base,nota,fecha_inicio_previsto,fecha_fin_previsto,co_sucursal,foto,genero)
          values($1,$2,$3,$4,$5,$6,$7,$8,$9::date,($9::date + interval '${numero_semanas} weeks'),$10,$11,$12) RETURNING ID;
    `,[cat_especialidad,
      cat_dia,
      hora_inicio,//3
      hora_fin,//4
      co_empresa, //5
      costo_colegiatura_base,//6
      costo_inscripcion_base,//7
      nota,//8
      new Date(fecha_inicio_previsto),            //9
      co_sucursal,//10
      especialidad.foto,//11
      genero]);      //12

      console.log("nuevo id del curso "+id);

      return id;
  }catch(e){  
    console.log("Error al insertar el curso "+e);
    throw new ExceptionBD("Error");
  }
};

const updateCurso = async (id,cursoData) => {
  console.log("@updateCurso");
  
  const { 
    cat_especialidad,
    dias_array,
    //cat_horario,        
    hora_inicio,
    hora_fin,
    costo_colegiatura_base,
    costo_inscripcion_base,
    nota,
    fecha_inicio_previsto,    
    numero_semanas,
    genero} = cursoData;

  //const especialidad = await genericDao.findOne("SELECT * FROM cat_especialidad where id = $1",[cat_especialidad]);

  return await genericDao.execute(
    `
                                    UPDATE CO_CURSO
                                    SET cat_especialidad = $2,
                                        dias_array = $3::int[],
                                        hora_inicio = $4,
                                        hora_fin = $5,
                                        costo_colegiatura_base = $6,
                                        costo_inscripcion_base = $7,
                                        nota = $8,
                                        fecha_inicio_previsto = $9,
                                        fecha_fin_previsto = ($9::date + interval '${numero_semanas} weeks'),                 
                                        fecha_modifico = (getDate('')+getHora('')),
                                        modifico = $10
                                    WHERE id = $1
                                    RETURNING ID;
                                    `,
    [id,//1
      cat_especialidad,//2
      dias_array,//3
      //cat_horario,        
      hora_inicio,//4
      hora_fin,//5
      costo_colegiatura_base,//6
      costo_inscripcion_base,//7
      nota,//8
      fecha_inicio_previsto,      //9
      genero//10
    ]
  );
};


const marcarCursoComoIniciado = async (uid,genero) => {
  console.log("@marcarCursoComoIniciado");
        
   return await genericDao.execute(
    `
                                    UPDATE CO_CURSO
                                    SET 
                                        fecha_inicio = getDate(''),
                                        semana_actual=1,
                                        activo=true,
                                        fecha_modifico = (getDate('')+getHora('')),
                                        modifico = $2
                                    WHERE uid = $1
                                    RETURNING ID;
                                    `,
    [uid,genero]
  );
};

const eliminarCurso = async (id,cursoData) => {
  console.log("@eliminarCurso");
  
  const { motivo,genero } = cursoData;

  return await genericDao.execute(
    `
                                    UPDATE CO_CURSO
                                    SET eliminado = true,
                                        motivo_baja = $2,
                                        fecha_modifico = (getDate('')+getHora('')),
                                        modifico = $3
                                    WHERE id = $1
                                    RETURNING ID;
                                    `,
    [id,motivo, genero]
  );
};



const getCursosSucursal = async (idSucursal) => {
    console.log("@getCursosSucursal");
    return await genericDao.findAll(getQueryBase(' curso.co_sucursal = $1 '),[idSucursal]);  
};

const getCursosActivoSucursal = async (idSucursal,activo) => {
  console.log("@getCursosActivoSucursal");  
  return await genericDao.findAll(getQueryBase(' curso.co_sucursal = $1 AND curso.activo = $2 '),[idSucursal,activo]);
};
  
const getCursosActivos = async (idSucursal,idEspecialidad) => {
  console.log("@getcursosActivos");
  return await genericDao.findAll(getQueryBase(' curso.co_sucursal = $1 and esp.id = $2 '),[idSucursal,idEspecialidad]);
};

const getCursosInicianHoy = async () => {
  console.log("@getCursosInicianHoy");
  return await genericDao.findAll(getQueryBase(` curso.fecha_inicio_previsto::date <= getDate('') and curso.activo = false and curso.semana_actual = 0  `),[]);
};

const getCursosInicianProximosDias = async (idSucursal) => {
  console.log("@getCursosInicianHoy");
  return await genericDao.findAll(
                  getQueryBase(` curso.fecha_inicio_previsto::date <= (getDate('') + interval '7 days') and suc.id = $1 and curso.activo = false and curso.semana_actual = 0  `)
                  ,[idSucursal]
                );
};


const getCursoByUid = async (uid) => {
  console.log("@getCursoByUid");
  return await genericDao.findOne(
                  getQueryBase(` curso.uid = $1  `)
                ,[uid]);
};

const getCursoById = async (id) => {
  console.log("@getCursoById");
  return await genericDao.findOne(`select * from co_curso where id = $1 and eliminado = false`,[id]);
};


const actualizarTotalAdeudaAlumno = async (idAlumno,genero) => {
  console.log("@actualizarTotalAdeudaAlumno");  

  return genericDao.execute(` UPDATE CO_ALUMNO SET 
                                  total_adeudo = (select case when sum(total) is null then 0 else sum(total) end from co_cargo_balance_alumno where co_alumno = $1 and eliminado = false),
                                  fecha_modifico = (getDate('')+getHora(''))::timestamp,
                                  modifico = $2
                            WHERE  id=$1
                              returning id`
        ,[idAlumno,genero]);
};



const getQueryBase = (criterio)=>` select curso.id,
curso.costo_colegiatura_base,
curso.costo_inscripcion_base,
curso.nota,
to_char(curso.fecha_inicio_previsto,'yyyy-MM-dd') as fecha_inicio_previsto,
to_char(curso.fecha_inicio_previsto,'DD Mon YY') as fecha_inicio_previsto_format,        
to_char(curso.fecha_fin_previsto,'DD-MM-YYYY') as fecha_fin_previsto,
to_char(curso.fecha_fin_previsto,'DD Mon YY') as fecha_fin_previsto_format,        
(select string_agg(nombre,'-') from cat_dia where id = ANY(curso.dias_array::int[])) as dias, 
curso.dias_array::int[] as dias_array, 
to_char(curso.fecha_inicio,'DD-MM-YYYY') as fecha_inicio,
to_char(curso.fecha_inicio,'DD Mon YY') as fecha_inicio_format,        
to_char(curso.fecha_fin,'DD-MM-YYYY') as fecha_fin,
to_char(curso.fecha_fin,'DD Mon YY') as fecha_fin_format,        

esp.id as cat_especialidad,
esp.nombre as especialidad,
to_char(curso.hora_inicio,'H24:mi')||' - '||to_char(curso.hora_fin,'H24:mi') as horario,
suc.id as co_sucursal,
suc.nombre as sucursal,
curso.activo,
curso.uid,
curso.foto as foto_curso,
(curso.fecha_genero::date = getDate('')) as es_nuevo,
curso.fecha_inicio_previsto >= getDate('') as fecha_inicio_previsto_pasada,
(curso.fecha_inicio_previsto = getDate('')+1) as inicia_manana,
(select count(*) from co_inscripcion where co_curso = curso.id and eliminado = false) as inscripciones
from co_curso curso inner join cat_especialidad esp on esp.id = curso.cat_especialidad  
  --inner join cat_horario horario on horario.id = curso.cat_horario
  inner join co_sucursal suc on suc.id = curso.co_sucursal
where 
  ${criterio}  
  ${criterio ? ' and ':''} 
  curso.eliminado = false 	
  --and curso.fecha_fin < current_date	       
order by curso.fecha_inicio_previsto desc`;


module.exports = {
  createCurso,
  getCursoById,
  updateCurso,
  getCursosInicianProximosDias,
  eliminarCurso,
  getCursosInicianHoy,
  getCursosActivos,
  getCursosSucursal,
  getCursoByUid,  
  marcarCursoComoIniciado,
  actualizarTotalAdeudaAlumno,
  getCursosActivoSucursal
};
