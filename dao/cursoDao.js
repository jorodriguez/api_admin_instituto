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
      cat_horario,
      co_empresa,
      co_sucursal,
      costo_colegiatura_base,
      costo_inscripcion_base,
      nota,
      fecha_inicio_previsto,
            
      genero    
    } = cursoData;

    console.log(JSON.stringify(cursoData));

    const especialidad = await genericDao.findOne("SELECT * FROM cat_especialidad where id = $1",[cat_especialidad]);

    return await genericDao.execute(`
          insert into co_curso(cat_especialidad,dias_array,cat_horario,co_empresa,costo_colegiatura_base,costo_inscripcion_base,nota,fecha_inicio_previsto,fecha_fin_previsto,co_sucursal,genero)
          values($1,$2::int[],$3,$4,$5,$6,$7,$8::date,($8::date + interval '${especialidad.duracion} weeks'),$9,$10) RETURNING ID;
    `,[cat_especialidad,
      dias_array,
      cat_horario,
      co_empresa,      
      costo_colegiatura_base,
      costo_inscripcion_base,
      nota,
      new Date(fecha_inicio_previsto),
            
      co_sucursal,
      genero]);      

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
    cat_horario,        
    costo_colegiatura_base,
    costo_inscripcion_base,
    nota,
    fecha_inicio_previsto,    
    genero} = cursoData;

  const especialidad = await genericDao.findOne("SELECT * FROM cat_especialidad where id = $1",[cat_especialidad]);

  return await genericDao.execute(
    `
                                    UPDATE CO_CURSO
                                    SET cat_especialidad = $2,
                                        dias_array = $3::int[],
                                        cat_horario = $4,
                                        costo_colegiatura_base = $5,
                                        costo_inscripcion_base = $6,
                                        nota = $7,
                                        fecha_inicio_previsto = $8,
                                        fecha_fin_previsto = ($8::date + interval '${especialidad.duracion} weeks'),                 
                                        fecha_modifico = (getDate('')+getHora('')),
                                        modifico = $9
                                    WHERE id = $1
                                    RETURNING ID;
                                    `,
    [id,
      cat_especialidad,
      dias_array,
      cat_horario,        
      costo_colegiatura_base,
      costo_inscripcion_base,
      nota,
      fecha_inicio_previsto,      
      genero]
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

 const getCursosActivoSucursal = async (idSucursal) => {
    console.log("@getCursosActivoSucursal");
    return await genericDao.findAll(getQueryBase(' curso.co_sucursal = $1 '),[idSucursal]);
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
horario.id as cat_horario,	 
horario.nombre as horario,
suc.id as co_sucursal,
suc.nombre as sucursal,
curso.activo,
curso.uid,
curso.foto as foto_curso,
(select count(*) from co_inscripcion where co_curso = curso.id and eliminado = false) as inscripciones
from co_curso curso inner join cat_especialidad esp on esp.id = curso.cat_especialidad  
  inner join cat_horario horario on horario.id = curso.cat_horario
  inner join co_sucursal suc on suc.id = curso.co_sucursal
where 
  ${criterio}  
  ${criterio ? ' and ':''} 
  curso.eliminado = false 	
  --and curso.fecha_fin < current_date	       
order by curso.fecha_inicio_previsto desc`;

const getSeriesPeriodosCurso = (uidCurso) => {    
  return genericDao.findAll(getQueryBaseSeries(), [uidCurso]);
}

const getQueryBaseSeries = ()=>`
with periodo as(     
  select e.id as cat_especialidad,fecha_inicio_previsto::date,fecha_fin_previsto::date,e.duracion,d.equivalencia,d.nombre as periodo
  from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad
               inner join cat_duracion d on d.id = e.cat_duracion
  where c.uid = $1 and c.eliminado = false      
), materias as(
SELECT 
ROW_NUMBER () OVER (ORDER BY m.id) as numero_periodo,
esp.nombre as modulo,
m.nombre as clase,
p.fecha_inicio_previsto,
p.fecha_fin_previsto,	
to_char((p.fecha_inicio_previsto + (ROW_NUMBER() OVER (ORDER BY m.id) -1 ||' week')::interval)::date,'DD-MM-YYYY') as fecha_semana_clase_format, 	
(p.fecha_inicio_previsto + (ROW_NUMBER() OVER (ORDER BY m.id) -1 ||' week')::interval) as fecha_semana_clase, 	
p.equivalencia     
FROM co_materia_modulo_especialidad m inner join co_modulo_especialidad esp on esp.id = m.co_modulo_especialidad
               inner join periodo p on p.cat_especialidad = esp.cat_especialidad
) select m.*,
    extract(week from m.fecha_semana_clase::date)::int as numero_semana_anio,
    extract(year from m.fecha_semana_clase::date)::int as numero_anio 	 	
from materias m`;

/*const getQueryBaseSeries = ()=>`
  with curso as(	
      select fecha_inicio_previsto::date,fecha_fin_previsto::date,e.duracion,d.equivalencia,d.nombre as periodo
      from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad
                   inner join cat_duracion d on d.id = e.cat_duracion
      where c.uid = $1 and c.eliminado = false
  )select ROW_NUMBER () OVER (ORDER BY generate_series) as numero_periodo,
          curso.periodo,
          to_char(generate_series::date,'DD-MM-YYYY') as inicio_semana,	         
          to_char((generate_series + interval '1 week')::date,'DD-MM-YYYY') as fin_semana
      FROM curso,generate_series(curso.fecha_inicio_previsto,curso.fecha_fin_previsto, '1 week')
  LIMIT (select e.duracion from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad where c.uid = $1 )
`;*/



module.exports = {
  createCurso,
  getCursoById,
  updateCurso,
  getCursosInicianProximosDias,
  eliminarCurso,
  getCursosInicianHoy,
  getCursosActivos,
  getCursosActivoSucursal,
  getCursoByUid,
  getSeriesPeriodosCurso
};
