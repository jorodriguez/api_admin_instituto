const Joi = require('joi');
const handle = require('../helpers/handlersErrors');

const schemaFechaNoSemanas = 
    Joi.object({                
    fecha_inicio:Joi.date().required(),            
    numero_pagos:Joi.number().required(),
    esquema:Joi.number().required(),
    co_empresa:Joi.number().required()
});

module.exports = {schemaFechaNoSemanas}