
const handle = require('../helpers/handlersErrors');
const reporteAlumnosService = require('../services/reporteAlumnosService');

const getReporteListaAlumnos = async (request, response) => {
    console.log("@getReporteListaAlumnos");
    try {

        const { uidCurso } = request.params;

        console.log("uidCurso "+uidCurso);

        const lista = await reporteAlumnosService.getReporteListaAlumnosCurso({uidCurso});

        response.status(200).json(lista);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getReporteListaAlumnos
};
