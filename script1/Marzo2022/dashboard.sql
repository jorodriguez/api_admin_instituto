
-- query para obtener los totales agrupados por cargo
select  
	tipo_cargo.id,
	tipo_cargo.nombre ||' '||coalesce(especialidad.nombre,'') as concepto,
	--curso.fecha_inicio_previsto,
	dia.nombre as dia,
	curso.hora_inicio,	
	sum(rel.pago) as ingreso,
	count(pago.id) as numero_pagos
from co_pago_balance_alumno pago inner join  co_pago_cargo_balance_alumno rel on rel.co_pago_balance_alumno = pago.id
					inner join co_cargo_balance_alumno cargo on cargo.id = rel.co_cargo_balance_alumno
					inner join cat_cargo tipo_cargo on tipo_cargo.id = cargo.cat_cargo
					left join co_curso curso on curso.id = cargo.co_curso
					left join cat_dia dia on dia.id = curso.cat_dia
					left join cat_especialidad especialidad on especialidad.id = curso.cat_especialidad
where rel.eliminado = false
	and pago.eliminado = false
	and cargo.eliminado = false
	and pago.fecha::date between '2022-03-01' and '2022-03-08'
group by tipo_cargo.id,especialidad.nombre,curso.hora_inicio,dia.nombre


select  tipo.nombre, sum(gasto) as gasto,count(g.id)
from co_gasto g inner join cat_tipo_gasto tipo on tipo.id = g.cat_tipo_gasto
where g.fecha between '2022-03-01' and '2022-03-31'
group by tipo.id