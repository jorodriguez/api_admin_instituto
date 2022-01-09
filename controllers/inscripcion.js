
const inscripcionService = require('../services/inscripcionService');
const handle = require('../helpers/handlersErrors');
const { schemaInscripcion } = require('../validacion-shemas/inscripcionShema');

const guardarInscripcion = async (request, response) => {
    console.log("@guardarInscripcion");
    try {

        const inscripcionData =
            {
                co_empresa,
                co_sucursal,
                co_curso,
                cat_genero,
                nombre,
                apellidos, 
                direccion,
                 telefono,
                fecha_nacimiento,
                nota,
                foto,
                cat_escolaridad,
                ocupacion,
                originario,
                tutor,
                telefono_tutor,
                costo_colegiatura, 
                costo_inscripcion,
                genero
            }
            = request.body;

            console.log(" casting  "+JSON.stringify(inscripcionData));

        await schemaInscripcion.validateAsync(inscripcionData);

        const results = await inscripcionService.guardarInscripcion(inscripcionData);

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getInscripciones = async (request, response) => {
    console.log("@getInscripciones");
    try {

        const id_sucursal = parseInt(request.params.id_sucursal);

        const results = await inscripcionService.getInscripciones(id_sucursal);
        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getInscripcionesAlumno = async (request, response) => {
    console.log("@getInscripcionesAlumno");
    try {

        const uid_alumno = request.params.uid;

        const results = await inscripcionService.getInscripcionesAlumno(uid_alumno);
        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getInscripcionesCursoActivoAlumno = async (request, response) => {
    console.log("@getInscripcionesCursoActivoAlumno");
    try {

        const uid_alumno = request.params.uid_alumno;

        const results = await inscripcionService.getInscripcionesActivasAlumno(uid_alumno);
        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



const confirmarInscripcion = async (request, response) => {
    console.log("@confirmarInscripcion");
    try {

        const id_inscripcion = request.params.id_inscripcion;
        const data = {confirmacion,nota,genero} = request.body;
        const results = await inscripcionService.confirmarInscripcion(id_inscripcion,data);
        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getInscripcionesCurso = async (request, response) => {
    console.log("@getInscripcionesCurso");
    try {

        const uid = request.params.uid;

        const results = await inscripcionService.getInscripcionesCurso(uid);
        
        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    guardarInscripcion,
    confirmarInscripcion,
    getInscripciones,
    getInscripcionesAlumno,
    getInscripcionesCurso,
    getInscripcionesCursoActivoAlumno

};