const genericDao = require('./genericDao');
const Tables = require('../utils/Tables');
const Dao = require('./Dao');
const siRolDao = new Dao(Tables.SI_ROL); 


const getAll = async () => {
    console.log("@getAllRoles");    
    return await siRolDao.findAll();
};




module.exports = {    
    getAll     
};