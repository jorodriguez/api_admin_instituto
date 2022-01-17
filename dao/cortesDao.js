
const genericDao = require('./genericDao');
const {castDateToStr} = require('../utils/UtilsDate');

const getSumaPagosPorRango = async (corteData) => {
    console.log("@getSumaPagosPorRango");
    
    const {idSucursal,fechaInicio,fechaFin} = corteData;

    const fechaInicioFormat =castDateToStr(fechaInicio);
    const fechaFinFormat =castDateToStr(fechaFin);
   
    return await genericDao.findOne(`            
        select	
	        sum(rel.pago) as total
        from co_pago_cargo_balance_alumno rel inner join co_pago_balance_alumno pago on pago.id = rel.co_pago_balance_alumno
					  		   inner join co_cargo_balance_alumno cargo on cargo.id = rel.co_cargo_balance_alumno
					  		   inner join co_alumno al on al.id = pago.co_alumno
        where pago.fecha::date between $2::date and $3::date
	            and rel.co_sucursal = $1
	            and rel.eliminado = false
	            and pago.eliminado = false
	            and cargo.eliminado = false
`,
        [idSucursal,fechaInicioFormat,fechaFinFormat]);
};

const getDetallePagos = async (corteData) => {
    console.log("@getDetallePagos");
   
    const {idSucursal,fechaInicio,fechaFin} = corteData;

  
    const fechaInicioFormat =castDateToStr(fechaInicio);
    const fechaFinFormat =castDateToStr(fechaFin);

    return await genericDao.findAll(`            
            select rel.id as co_pago_cargo_balance_alumno,		
                rel.pago,
                pago.folio,
                to_char(pago.fecha,'DD-MM-YYYY HH24:mm') as fecha,		
                pago.nota,
                al.foto,
                al.nombre as alumno,
                al.apellidos as apellidos,
                al.total_adeudo,
                fpago.nombre as forma_pago,
                esp.nombre as especialidad,
                semana.numero_semana_curso as numero_semana_curso,
                materia.nombre as materia,
                horario.nombre as horario,
                tipo_cargo.nombre as nombre_cargo                
            from co_pago_cargo_balance_alumno rel inner join co_pago_balance_alumno pago on pago.id = rel.co_pago_balance_alumno
                            inner join co_cargo_balance_alumno cargo on cargo.id = rel.co_cargo_balance_alumno
                            inner join cat_cargo tipo_cargo on tipo_cargo.id = cargo.cat_cargo
                            inner join co_alumno al on al.id = pago.co_alumno
                            inner join co_forma_pago fpago on fpago.id = pago.co_forma_pago
                            left join co_curso curso on curso.id = cargo.co_curso
                            left join cat_horario horario on horario.id = curso.cat_horario
                            left join cat_especialidad esp on esp.id = curso.cat_especialidad
                            left join co_curso_semanas semana on semana.id = cargo.co_curso_semanas
                            left join co_materia_modulo_especialidad materia on materia.id = semana.co_materia_modulo_especialidad							 
            where pago.fecha::date between $2::date and $3::date
                    and rel.co_sucursal = $1
                    and rel.eliminado = false
                    and pago.eliminado = false
                    and cargo.eliminado = false
            order by pago.folio

`,
        [idSucursal,fechaInicioFormat,fechaFinFormat]);
};




module.exports = {    
    getDetallePagos,
    getSumaPagosPorRango
}