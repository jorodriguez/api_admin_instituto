const {
    getQueryInstance
} = require('../services/sqlHelper');
const {
    Exception,
    ExceptionBD
} = require('../exception/exeption');
const {
    isEmptyOrNull
} = require('../utils/Utils');
const genericDao = require('./genericDao');

const QUERY_CORREOS_TOKEN_FAMILIARES_ALUMNO =
    `SELECT  	a.id,
                a.nombre as nombre_alumno,		
                a.co_sucursal, 
                a.co_empresa,
                string_agg(split_part(fam.nombre,' ',1),' / ') AS nombres_padres,    
                array_to_json(array_agg(to_json(fam.correo))) AS correos, 
                array_to_json(array_agg(to_json(fam.token))) as tokens
     FROM co_alumno_familiar rel inner join co_familiar fam on rel.co_familiar = fam.id
                            inner join co_parentesco parentesco on parentesco.id = rel.co_parentesco
                            inner join co_alumno a on a.id = rel.co_alumno
    WHERE co_alumno = ANY($1::int[]) --and envio_recibos
            and co_parentesco in (1,2) -- solos papa y mama
            and fam.eliminado = false 
            and rel.eliminado = false
    group by a.nombre,a.id `;

const getCorreosTokensAlumno = (idAlumno) => {
    console.log("@getCorreosTokensAlumno");
    return genericDao.findOne(QUERY_CORREOS_TOKEN_FAMILIARES_ALUMNO, [
        [idAlumno]
    ]);
};



const modificarFotoPerfil = async (idAlumno, metadaFoto, genero) => {
    console.log("@modificarFotoPerfil");

    console.log("idAlumno " + idAlumno);
    console.log("url " + metadaFoto.secure_url);
    console.log("public_id " + metadaFoto.public_id);
    console.log("genero " + genero);

    let foto = "";
    let public_id_foto = null;
    if (!metadaFoto) {
        foto = await genericDao.execute(`select foto from cat_genero where id = (select cat_genero from co_alumno where id = $1))`), [idAlumno];
    } else {
        foto = metadaFoto.secure_url;
        public_id_foto = metadaFoto.public_id;
    }

    return await genericDao.execute(` 
                            UPDATE co_alumno 
                             SET 
                                foto = $2,                                       
                                public_id_foto = $3,
                                fecha_modifico = (getDate('')+getHora(''))::timestamp,
                                modifico = $4
                             WHERE id = $1 RETURNING id;`, [idAlumno, foto, public_id_foto, genero]);
};

const getAlumnoPorId = (idAlumno) => {
    console.log("@destroyFoto");
    return genericDao.findOne(`select * from co_alumno where id = $1;`, [idAlumno]);
};


const activarAlumnoEliminado = (idAlumno, genero) => {
    console.log("@activarAlumnoEliminado");

    return genericDao.execute(` 
                            UPDATE co_alumno 
                             SET                                                     
                                fecha_modifico = (current_date+current_time),
                                fecha_reactivacion = (current_date+current_time),
                                eliminado = false,
                                modifico = $2
                             WHERE id = $1 RETURNING id;`, [idAlumno, genero]);
};


const bajaAlumno = (idAlumno, fechaBaja, observaciones, genero) => {

    return genericDao.execute(` 
                            UPDATE co_alumno 
                             SET 
                                fecha_baja =$2::date,                                                                
                                observaciones_baja=$3,
                                fecha_modifico = (current_date+current_time),                                
                                modifico = $4,
                                eliminado = true
                             WHERE id = $1 RETURNING id;`, [idAlumno, new Date(fechaBaja), observaciones, genero]);
}


const getAlumnos = (idSucursal) => {
    console.log("Consultando alumnos de la suc " + idSucursal);
    return genericDao.findAll(`
        SELECT 
            a.id as id_alumno,
            i.id as id_inscripcion,
            a.nombre as alumno,             	
            a.apellidos,
            a.nota,
            a.foto,
            s.nombre as nombre_sucursal,
            esp.id as id_especialidad,             	     
            esp.nombre as especialidad,             	     
            esp.color,             	     
            dias.nombre as dias,
            curso.fecha_inicio_previsto,
            curso.fecha_fin_previsto,
            curso.foto,
            genero.foto as foto_perfil,
            horario.nombre as horario
        FROM co_inscripcion i inner join co_alumno a on a.id = i.co_alumno
                     inner join cat_genero genero on genero.id = a.cat_genero
                     inner join co_sucursal s on i.co_sucursal = s.id             				
                     inner join co_curso curso on curso.id = i.co_curso             					             					
                     inner join cat_especialidad esp on esp.id = curso.cat_especialidad
                     inner join cat_dia dias on dias.id = curso.cat_dia
                     inner join cat_horario horario on horario.id = curso.cat_horario
        WHERE a.co_sucursal = $1 AND a.eliminado=false 
        ORDER BY i.fecha_genero DESC
        `, [idSucursal]);


}


module.exports = {
    getAlumnos,
    getCorreosTokensAlumno,        
    modificarFotoPerfil,
    getAlumnoPorId,
    bajaAlumno,
    activarAlumnoEliminado

}