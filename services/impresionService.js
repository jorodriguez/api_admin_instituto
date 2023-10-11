const inscripcionDao = require('../dao/inscripcionDao');
const alumnoService = require('./alumnoService');
const sucursalService = require('./sucursalService');
const templateService = require('./templateService');
const { TIPO_TEMPLATE } = require('../utils/Constantes');


const getFormatoCredencial = async(uuidAlumno, genero) => {

    console.log("@getFormatoCredencial");

    const listaInscripcionCurso = await inscripcionDao.getIncripcionCursoAlumno(uuidAlumno);

    const inscripcionCurso = listaInscripcionCurso[0] || null;

    //    const alumno = await alumnoService.getAlumnoPorUId(uuidAlumno);

    const nombreGrupo = `${inscripcionCurso.especialidad}`;

    const sucursal = await sucursalService.getSucursalPorId(inscripcionCurso.co_sucursal);

    //const turno = `${curso.dia} ${curso.horario}`;

    const params = {
        nombre_sucursal: `${inscripcionCurso.alumno} ${inscripcionCurso.apellidos}`,
        domicilio_sucursal: sucursal.direccion,
        nombre_carrera: nombreGrupo,
        ciclo: "-",
        foto: inscripcionCurso.foto
    };

    const html = await templateService
        .loadTemplateEmpresa({
            params,
            idEmpresa: inscripcionCurso.co_empresa,
            idUsuario: genero,
            tipoTemplate: TIPO_TEMPLATE.FORMATO_CREDENCIAL
        });

    return html;
};



module.exports = {
    getFormatoCredencial
};