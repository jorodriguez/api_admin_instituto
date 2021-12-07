
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
       
            const uid = parseInt(request.params.uid);           

            const result = await alumnoService.getAlumnoPorUId(uid);
            response.status(200).json(result);
            
    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const updateAlumno = async (request, response) => {
    console.log("@updateAlumnos");
    try {       
        const id = parseInt(request.params.id);

        const alumno = request.body;

        console.log(JSON.stringify(alumno));

        const result = await pool.query(
            `UPDATE CO_ALUMNO  
            SET nombre = $2, 
            apellidos = $3,
            fecha_nacimiento = $4::date,
            direccion = $5,
            nota = $6,
            hora_entrada = $7,
            hora_salida=$8,
            costo_inscripcion = $9,
            costo_colegiatura = $10,
            minutos_gracia = $11,
            foto= $12,
            fecha_reinscripcion = $13,
            co_grupo = $14, 
            nombre_carino = $15, 
            mostrar_nombre_carino = $16,
            color = $17,
            cat_genero = $18,                
            modifico = $19, 
            fecha_inscripcion = $20,
            telefono = $21,
            correo = $22,
            fecha_limite_pago_mensualidad = $23,
            numero_dia_limite_pago = to_char($23::date,'dd')::integer
             WHERE id = $1
             RETURNING ID`,
            [
                id,
                alumno.nombre, alumno.apellidos, (alumno.fecha_nacimiento == "" ? null : alumno.fecha_nacimiento), alumno.direccion,
                alumno.nota, alumno.hora_entrada, alumno.hora_salida,
                alumno.costo_inscripcion, alumno.costo_colegiatura, alumno.minutos_gracia,
                alumno.foto, (alumno.fecha_reinscripcion == "" ? null : alumno.fecha_reinscripcion),
                alumno.co_grupo, alumno.nombre_carino,(alumno.mostrar_nombre_carino || false),
                (alumno.color || null),
                alumno.cat_genero, alumno.genero,
                (alumno.fecha_inscripcion == "" ? null : alumno.fecha_inscripcion),
                alumno.telefono,
                alumno.correo,
                alumno.fecha_limite_pago
            ]);
        
        response.status(200).json(true);
      
    } catch (e) {
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
    updateAlumno,
    bajaAlumno,    
    activarAlumnoEliminado
};