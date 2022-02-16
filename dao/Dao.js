
//const genericDao = require('./genericDao');
const { knex } = require('../db/conexion');
const { isEmptyOrNull } = require('../utils/Utils');
const { Exception } = require('../exception/exeption');

class Dao{
    
    constructor(modelName){
        this.modelName = modelName;

        this.validar = () => { if (this.modelName == '') { throw "La tabla no esta definida"; } };

        this.insert = async (modelData) => {
            console.log("@insert " + this.modelName);
            console.log("modelData = "+JSON.stringify(modelData));
            return await knex(this.modelName).insert(modelData).returning('*');

        };

        this.update = async (id, modelData) => {
            return await knex(this.modelName).update(modelData).where("id", id).returning('*');
        };

        this.remove = async (id, genero) => {
            return await knex(this.modelName).update({ fecha_modifico: '(getDate()+getHora())::timestamp', modifico: genero, eliminado: true }).where("id", id);
        };

        this.findAll = async () => {
            console.log("===this.modelName " + this.modelName);
            return await knex.select('*').from(this.modelName).where('eliminado', false);
        };

        this.findById = async (id) => {
            return await knex.select('*').from(this.modelName).where('id', id).first();
        };

        this.getInstanceModel = () => {
            return knex(this.modelName);
        };

        this.getSelectFrom = () => {
            return knex.select('*').from(this.modelName);
        };

        this.execRaw = () => {
            return knex.raw;
        };

        this.getTransaction = async () => {            
            return await knex.transaction;
        };
    }      

}


module.exports = Dao;