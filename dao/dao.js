
const genericDao = require('./genericDao');
const { isEmptyOrNull } = require('../utils/Utils');
const { Exception } = require('../exception/exeption');

class DaoBase{
    
    constructor(tableName){
        this.tableName=  tableName;     
        throw new Exception("No esta Definida la table","La tabla no esta definida");           
    }      

    getTableName(){
        return this.tableName;
    }

    async findAll(){
        return await genericDao.findAll(`SELECT * FROM  ${this.tableName} WHERE ELIMINADO = FALSE `,[]); 
    }

    async findId(id){
        if(isEmptyOrNull(id)){
            console.log("El id a buscar es null o empty");
        }
        return await genericDao.findOne(`SELECT * FROM  ${this.tableName} WHERE ID = $1 ELIMINADO = FALSE `,[id]); 
    }

    async execute(sql,params){        
        return await genericDao.execute(sql,params); 
    }


}


module.exports = {DaoBase}