


alter table si_opcion add column orden integer not null default 0;

alter table si_opcion add column menu_principal boolean not null default false;


update si_opcion set nombre = 'Inscripciones' where id=16;

--cobranza
update si_opcion set orden = 1 where id=15;
--Inscripciones
update si_opcion set orden = 2 where id=16;
--Talleres
update si_opcion set orden = 3 where id=17;
-- gastos
update si_opcion set orden = 4 where id=20;
-- Cortes
update si_opcion set orden = 5 where id=19;

update si_opcion set menu_principal = true;

update si_opcion set menu_principal = false where id =18;

update si_opcion set si_opcion = null  where id in (15,16,17,20,19);

update si_opcion set si_opcion = 16  where id in (18);

--agregando opcion para el rol directora
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(1,15,1) --cobranza



update si_rol set nombre = 'COBRANZA' where id=2;



--agregando opcion para el rol cobranza
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(2,3,1), -- alumnos
	 (2,15,1), -- cobranza
	 (2,17,1), -- talleres
	 (2,19,1) -- cobranza

update si_opcion set eliminado = true where id = 1;


--agregando opcion para el rol inscripciones
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(4,18,1), -- alumnos
	 (4,16,1) -- inscripciones

-- rol para inscripciones
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(124,1,4,1,1);