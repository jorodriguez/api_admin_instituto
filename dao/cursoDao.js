const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");

/*
const registrarCurso = async (cursoData) => {
  console.log("@dao.registrarCurso");    
  try{
     
    return 0;

  }catch(e){  
    console.log("Error al insertar el curso "+e);
    throw new ExceptionBD("Error");
  }
};



const registrarEnvio = async (id,infoEnvio,genero) => {
  console.log("@registrarEnvio");
    
  return await genericDao.execute(
    `
                 UPDATE CO_AVISO
                     SET 
                        FECHA_MODIFICO = (current_date+current_time),
                        INFORMACION_ENVIO = $2,   
                        MODIFICO = $3,                                             
                        ENVIADO = true,
                        FECHA_ENVIO = (current_date+current_time)
                     WHERE ID = $1
                        RETURNING ID;
                `,
    [id,JSON.stringify(infoEnvio),genero]
  );
};

const modificarAviso = async (avisoData) => {
  console.log("@modificarAviso");
  const { id, para, titulo, aviso, etiqueta, nota_interna, genero } = avisoData;
  return await genericDao.execute(
    `
                UPDATE CO_AVISO
                    SET PARA = $2,
                        TITULO = $3,
                        AVISO = $4,
                        ETIQUETAS = $5,
                        NOTA_INTERNA = $6,
                        FECHA_MODIFICO = (current_date+current_time),
                        MODIFICO = $7
                WHERE ID = $1
                RETURNING ID;
                `,
    [id, JSON.stringify(para), titulo, aviso, JSON.stringify(etiqueta), nota_interna, genero]
  );
};

const eliminarAvisos = async (avisoData) => {
  console.log("@eliminarAvisos");

  const { ids, genero } = avisoData;
  var idsAviso = "";
  var first = true;

  ids.forEach((element) => {
    if (first) {
      idsAviso += element + "";
      first = false;
    } else {
      idsAviso += "," + element;
    }
  });
  return await genericDao.execute(
    `
                                    UPDATE CO_AVISO     
                                    SET eliminado = true,
                                        fecha_modifico = (current_date+current_time),
                                        modifico = $2
                                    WHERE id = ANY($1::INT[]);                                    
                                    `,
    [idsAviso, genero]
  );
};

const obtenerAvisos = async (idUsuario) => {
  console.log("@obtenerAvisos");

  return await genericDao.findAll(
    `
                SELECT a.id,
                e.nombre as empresa, 
                to_char(a.fecha,'dd-MM-YYYY') as fecha,
                a.para,
                a.etiquetas,
                a.titulo ,
                a.aviso,		
                a.nota_interna,
                a.enviado,
                to_char(a.fecha_envio,'dd-MM-YYYY HH:MM') as fecha_envio,
                a.informacion_envio,
                to_char(a.fecha_genero,'dd-MM-YYYY') as fecha_genero,
                u.nombre as usuario_genero		
            FROM CO_AVISO a inner join co_empresa e on e.id = a.co_empresa
                            inner join usuario u on u.id = a.genero
                    where u.id = $1
                    and a.eliminado = false
             order by a.fecha_envio desc
            `,
    [idUsuario]
  );
};

const obtenerAvisoId = async (idAviso) => {
    console.log("@obtenerAvisoId");
  
    return await genericDao.findOne(
      `
                  SELECT a.id,
                  e.nombre as empresa, 
                  to_char(a.fecha,'dd-MM-YYYY') as fecha,
                  a.para,
                  a.etiquetas,
                  a.titulo,
                  a.aviso,		
                  a.nota_interna,
                  a.co_empresa,                  
                  a.genero            
              FROM CO_AVISO a inner join co_empresa e on e.id = a.co_empresa                             
              where a.id = $1
                      and a.eliminado = false             
              `,
      [idAviso]
    );
  };
  */

const getCursosActivos = async (idSucursal,idEspecialidad) => {
  console.log("@getcursosActivos");

  return await genericDao.findAll(
      `               
      select curso.id,
	      curso.costo_colegiatura_base,
	      curso.costo_inscripcion_base,
	      curso.nota,
	      curso.fecha_inicio_previsto,
	      curso.fecha_fin_previsto,
        esp.id as id_especialidad,
        esp.nombre as especialidad,
        dias.id as id_dias,
        dias.nombre as dias, 
        horario.id as id_horario,	 
        horario.nombre as horario,
        suc.id as id_sucursal,
	      suc.nombre as sucursal,
        curso.activo,
	      (select count(*) from co_inscripcion where co_curso = curso.id and eliminado = false) as inscripciones
      from co_curso curso inner join cat_especialidad esp on esp.id = curso.cat_especialidad
			  	inner join cat_dia dias on dias.id = curso.cat_dia				
				  inner join cat_horario horario on horario.id = curso.cat_horario
				  inner join co_sucursal suc on suc.id = curso.co_sucursal
      where curso.co_sucursal = $1 
          and esp.id = $2
	        and curso.eliminado = false 	
	        and curso.fecha_fin < current_date	       
      order by curso.fecha_inicio_previsto desc
      `,
    [idSucursal,idEspecialidad]
  );
};



module.exports = {
  getCursosActivos
};
