const genericDao = require('./genericDao');

const getCortePagosSucursal = async (idSucursal) => {
    console.log("@getCortePagos");
   
    return await genericDao.findAll(
        `
            
WITH relacion_cargos AS (	                   
    SELECT  cargo.id,            
        rel.pago,
        cat.nombre as nombre_cargo,			            
        cargo.pagado,
        cargo.nota as nota_cargo,
        cargo.cantidad,
        cargo.cargo,
        cargo.total,
        cargo.descuento,
        cargo.total_pagado,
        esp.nombre as especialidad,
        'Semana '||semana.numero_semana_curso as numero_semana_curso,
        materia.nombre as materia
    FROM co_pago_cargo_balance_alumno rel inner join co_cargo_balance_alumno cargo on rel.co_cargo_balance_alumno = cargo.id									
                                inner join co_alumno al on al.id = cargo.co_alumno
                                    inner join cat_cargo cat on cat.id = cargo.cat_cargo												                                                
                                    left join co_curso curso on curso.id = cargo.co_curso
                                    left join cat_especialidad esp on esp.id =  curso.cat_especialidad
                                    left join co_curso_semanas semana on semana.id =  cargo.co_curso_semanas
                                    left join co_materia_modulo_especialidad materia on materia.id = semana.co_materia_modulo_especialidad
     WHERE al.co_sucursal = $1 and cargo.eliminado = false 		                          
)    
select pago.id,
        pago.id as folio,
         pago.pago,
        fpago.nombre as forma_pago,
        fpago.permite_factura as permite_factura_forma_pago,
        pago.identificador_factura,
        pago.identificador_pago,
        TO_CHAR(pago.fecha, 'dd-mm-yyyy') as fecha,		            
        al.nombre as nombre_alumno,
        al.apellidos as apellidos_alumno,                                        
        suc.id as id_sucursal,
        suc.nombre as nombre_sucursal,
        suc.direccion as direccion_sucursal,		
        count(cargo.id) as count_cargos,		
        suc.co_empresa,
        array_to_json(array_agg(to_json(cargo.*))) AS cargos
    from co_pago_balance_alumno pago inner join co_pago_cargo_balance_alumno rel on pago.id = rel.co_pago_balance_alumno
                        inner join relacion_cargos cargo on rel.co_cargo_balance_alumno = cargo.id
                        inner join co_forma_pago fpago on fpago.id = pago.co_forma_pago									
                        inner join co_alumno al on al.id = pago.co_alumno																		
                        inner join co_sucursal suc on al.co_sucursal = suc.id									
    where al.co_sucursal = $1
            and pago.fecha::date = getDate('')
    group by pago.id,fpago.permite_factura,fpago.nombre,al.nombre,al.apellidos,suc.id,suc.nombre,suc.direccion,suc.co_empresa
`,
        [idSucursal]);
};




module.exports = {
    getCortePagosSucursal
}