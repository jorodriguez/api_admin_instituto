const reportesAlumnoDao = require('../dao/reportesAlumnoDao');
const templateService = require('./templateService');
const {TIPO_TEMPLATE} = require('../utils/Constantes');


const getReporteListaAlumnosCursoHtml = async (filtro = {uidCurso})=>{
    
    const lista = await reportesAlumnoDao.getReporteListaAlumnosCurso(filtro);
        
    
    const html = await  templateService
                            .loadTemplateEmpresa({
                                    params,
                                    idEmpresa:params.co_empresa,
                                    idUsuario,
                                     tipoTemplate: TIPO_TEMPLATE.LISTA_REPORTE_ALUMNOS
                                });
    
     return html;
};


module.exports = { getReporteListaAlumnosCurso:reportesAlumnoDao.getReporteListaAlumnosCurso};