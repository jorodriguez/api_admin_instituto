
CREATE TABLE cat_esquema_pago
(
	id serial NOT NULL primary key,		
	nombre text not null,	
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

insert into cat_esquema_pago(id,nombre, genero) values(1,'Semanal',1),(2,'Mensual',1);

alter table co_inscripcion add column cat_esquema_pago integer not null default 1 references cat_esquema_pago(id);

alter table co_cargo_balance_alumno add column cat_esquema_pago integer not null default 1 references co_cargo_balance_alumno(id);


alter table co_inscripcion alter column cat_esquema_pago drop default;

alter table co_cargo_balance_alumno alter column cat_esquema_pago drop default;
