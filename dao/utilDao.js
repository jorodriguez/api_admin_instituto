const genericDao = require('./genericDao');
const { encriptar } = require('../utils/Utils');

const generarRandomPassword = () => {

    return new Promise((resolve, reject) => {
        var respuesta = { password: "", encripted: "" };

        genericDao
            .findOne(
                `SELECT pass||(random() * 5000 + 1)::int AS password FROM random_pass  ORDER BY random() LIMIT 1;`,
                []
            ).then(result => {
                respuesta.password = result.password;
                respuesta.encripted = encriptar(result.password);
                resolve(respuesta);
            }).catch(e => {
                console.error("Error al generar el password " + e);
                reject(null);
            });
    });
};

const getSeriesPeriodosCurso = (uidCurso) => {    
    return genericDao.findAll(getQueryBaseSeries(), [uidCurso]);
}

const getQueryBaseSeries = ()=>`
    with curso as(	
        select fecha_inicio_previsto::date,fecha_fin_previsto::date,e.duracion,d.equivalencia,d.nombre as periodo
        from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad
                     inner join cat_duracion d on d.id = e.cat_duracion
        where c.uid = $1 and c.eliminado = false
    )select ROW_NUMBER () OVER (ORDER BY generate_series) as numero_periodo,
            curso.periodo,
             generate_series::date as inicio_semana,	         
        (generate_series + interval '1 week')::date as fin_semana
        FROM curso,generate_series(curso.fecha_inicio_previsto,curso.fecha_fin_previsto, '1 week')
    LIMIT (select e.duracion from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad where c.uid = $1 )
`;


module.exports = { generarRandomPassword,getSeriesPeriodosCurso };