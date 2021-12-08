
const { pool } = require('../db/conexion');
const handle = require('../helpers/handlersErrors');
const { isEmptyOrNull } = require('../utils/Utils');
//const Joi = require('@hapi/joi');

const alumnoService = require('../services/alumnoService');
const balance_alumno = require('./balance_alumno');


const getAlumnos = async (request, response) => {
    console.log("@getAlumnos");
    try {
       
            const id_sucursal = parseInt(request.params.id_sucursal);
            console.log("Consultando alumnos de la suc " + id_sucursal);

            const results = await alumnoService.getAlumnos(id_sucursal);
            response.status(200).json(results);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const getAlumnoUId = async (request, response) => {
    console.log("@getAlumnoUId");
    try {
       
            const uid = request.params.uid;           

            const result = await alumnoService.getAlumnoPorUId(uid);
            response.status(200).json(result);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const modificarAlumno = async (request, response) => {
    console.log("@modificarAlumno");
    try {       
        const id = parseInt(request.params.id);

        const alumnoData = request.body;

        console.log(JSON.stringify(alumnoData));

        const result = await alumnoService.modificarAlumno(id,alumnoData);

        response.status(200).json(result);
      
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



// DELETE—/alumnos/:id | deleteAlumno()
const bajaAlumno = async (request, response) => {
    console.log("@bajaAlumno");
    try {
        
        const id = parseInt(request.params.id);

        const { fechaBaja,observaciones, genero }  = request.body;

        const result = await alumnoService.bajaAlumno(id,fechaBaja,observaciones,genero);

        response.status(200).json(result);

        /*pool.query('UPDATE CO_ALUMNO SET eliminado = true,fecha_baja=current_timestamp WHERE id = $1', [id], (error, results) => {
            if (error) {

                handle.callbackError(error, response);
                return;
            }s
            response.status(200).send(`User deleted with ID: ${id}`);
        });*/
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const activarAlumnoEliminado = async (request, response) => {
    console.log("@reactivarAlumno");
    try {
        
        const id = parseInt(request.params.id);

        const { genero }  = request.body;

        const result = await alumnoService.activarAlumnoEliminado(id,genero);
        
        response.status(200).json(result);

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};

module.exports = {
    getAlumnos,    
    getAlumnoUId,
    modificarAlumno,
    bajaAlumno,    
    activarAlumnoEliminado
};