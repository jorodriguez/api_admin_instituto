const {
    getQueryInstance
} = require('../controllers/sqlHelper');
const {
    Exception,
    ExceptionBD
} = require('../exception/exeption');
const {
} = require('../utils/Utils');
const genericDao = require('./genericDao');



const getContadores = (data = {coEmpresa,coSucusal}) => {    
    console.log("@getContadores");
    
    const  { coEmpresa,coSucursal } = data;

    return genericDao.findOne(`
        select 
    	  (select count(*) as alumnos from co_inscripcion where eliminado = false and co_empresa = $1 and co_sucursal = $2) as alumnos,
	    (select count(*) as talleres from co_curso where eliminado = false and co_empresa = $1 and co_sucursal = $2) as talleres
    ` ,[coEmpresa,coSucursal]);
};

const getTotalAdeudoSucursal = (data = {coEmpresa,coSucusal}) => {    
    console.log("@getTotalAdeudoSucursal");
    
    const  { coSucursal } = data;

    return genericDao.findOne(`
            SELECT		
                sum(b.total) as total,				
                count(b.*) as cargos		
            FROM co_cargo_balance_alumno b inner join co_alumno a on b.co_alumno = a.id
                         inner join cat_cargo cargo on b.cat_cargo = cargo.id					                                                                                                    
            WHERE a.co_sucursal = $1
                and b.eliminado = false 
                and a.eliminado = false
                and pagado = false

    ` ,[coSucursal]);
};

const getTotalAdeudoDesgloseCargosSucursal = (data = {coEmpresa,coSucusal}) => {    
    console.log("@getTotalAdeudoDesgloseCargosSucursal");
    
    const  { coSucursal } = data;

    return genericDao.findOne(`
    SELECT		
            cargo.nombre as nombre_cargo,		
            sum(b.total) as total,
            sum(b.cargo) as cargo,
            sum(b.total_pagado) as pagado,
            count(b.*) as cargos		
    FROM co_cargo_balance_alumno b inner join co_alumno a on b.co_alumno = a.id
                         inner join cat_cargo cargo on b.cat_cargo = cargo.id					                                                                                                    
        WHERE a.co_sucursal = $1
            and b.eliminado = false 
            and a.eliminado = false
            and pagado = false
        group by cargo.nombre
        ORDER by cargo.nombre desc

    ` ,[coSucursal]);
};




module.exports = {
    getContadores,getTotalAdeudoSucursal,getTotalAdeudoDesgloseCargosSucursal
}