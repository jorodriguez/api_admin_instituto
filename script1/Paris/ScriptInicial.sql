

select * from co_empresa


update co_empresa set nombre = 'Instituto de belleza Paris', 
	logotipo='https://image.freepik.com/vector-gratis/vector-diseno-logotipo-tienda-bicicletas_53876-40626.jpg'
where id = 1;


select * from co_sucursal

update co_sucursal set nombre = 'Campus 1', direccion='Blvd. Anáhuac 7940 Col. Unidad Nacional Nuevo Laredo Tamaulipas', calcular_recargos = false where id = 1;

update co_sucursal set nombre = 'Campus 2', direccion='Guerrero 1011 Altos Col. Centro Nuevo Laredo Tamaulipas', calcular_recargos = false where id = 2;

update co_sucursal set nombre = 'Campus 3', direccion='Blvd. Pedro Pérez Ibarra Local 23 #96-A', calcular_recargos = false where id = 3;

	SET TIME ZONE 'Mexico/General';


CREATE TABLE cat_dia
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    		
	nombre text not null,
	numero_dia integer not null,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

insert into cat_dia(co_empresa, nombre, numero_dia,genero)
values(1,'Lunes',1,1),(1,'Martes',2,1),(1,'Miercoles',3,1),(1,'Jueves',4,1),(1,'Viernes',5,1);



CREATE TABLE cat_horario
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    		
	nombre text not null,
	hora_entra time not null, 
	hora_salida time not null,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

insert into cat_horario(co_empresa, nombre,hora_entra, hora_salida,genero)
values(1,'Matutino 8-2','8:00:00','14:00:00',1),(1,'Vespertino 8-2','14:00:00','19:00:00',1);



CREATE TABLE cat_duracion
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    		
	nombre text not null,
	equivalencia text not null,	
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

insert into cat_duracion(co_empresa, nombre,equivalencia,genero)
values(1,'Semana','1 week',1),(1,'Quincena','2 weeks',1),(1,'Mensual','1 month',1);


---drop table cat_especialidad

---drop table co_modulo_especialidad

--drop table co_materia_modulo_especialidad

CREATE TABLE cat_especialidad
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    			
	cat_duracion integer NOT NULL  references cat_duracion(id),
	duracion integer not null,
	nombre text not null,
	descripcion text not null,
	alumnos_permitidos integer,
	foto text ,
	activo boolean not null default true,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

insert into cat_especialidad(co_empresa, nombre,descripcion,alumnos_permitidos,cat_duracion,duracion,genero)
values(1,'Carrera de Diseñadora de Imagen Profesional','Carrera ',20,1,71,1),
	 (1,'Diplomado de Barbería','Diplomado ',20,1,12,1),
	 (1,'Diplomado de Uñas','Diplomado ',20,1,12,1),
	 (1,'Diplomado de Maquillaje','Diplomado ',20,1,12,1),
	 (1,'Diplomado de Cosmetología','Diplomado ',20,1,12,1),
	 (1,'Diplomado de Colorimetría','Diplomado ',20,1,12,1);



CREATE TABLE co_modulo_especialidad
(
	id serial NOT NULL primary key,		
	cat_especialidad integer NOT NULL  references cat_especialidad(id),    				
	co_empresa integer NOT NULL  references co_empresa(id),    				
	nombre text not null,
	descripcion text,
	numero_orden serial,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);



insert into co_modulo_especialidad(cat_especialidad,co_empresa,nombre,genero)
values(1,1,'1ER CUATRIMESTRE',1),
	 (1,1,'2DO CUATRIMESTRE',1),
	 (1,1,'3ER CUATRIMESTRE',1),
	 (1,1,'4TO CUATRIMESTRE',1),
	 (1,1,'5TO CUATRIMESTRE',1),
	 (1,1,'EXAMENES FINALES',1);




CREATE TABLE co_materia_modulo_especialidad
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    			
	cat_duracion integer NOT NULL  references cat_duracion(id),    			
	co_modulo_especialidad integer NOT NULL  references co_modulo_especialidad(id),
	nombre text not null,
	duracion integer not null,	
	numero_orden serial,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


--carrera de diseñadora - 1er cuatrimestre
insert into co_materia_modulo_especialidad(co_modulo_especialidad,co_empresa,cat_duracion,nombre,duracion,genero)
VALUES(1,1,1,'INTRODUCCION A LA BELLEZA',1,1),
	(1,1,1,'PEDICURE SPA',2,1),
	(1,1,1,'MANICURA SPA',2,1),
	(1,1,1,'DISEÑO DE UÑAS ACRILICAS',8,1),
	(1,1,1,'TRABAJO FINAL',1,1);



CREATE TABLE co_curso
(
	id serial NOT NULL primary key,	
	cat_especialidad integer NOT NULL  references cat_especialidad(id),
	cat_dia integer NOT NULL  references cat_dia(id),
	cat_horario integer NOT NULL  references cat_horario(id),	
	co_empresa integer NOT NULL  references co_empresa(id),    					
	costo_colegiatura_base numeric not null,
	costo_inscripcion_base numeric not null,
	nota text not null,
	fecha_inicio_previsto date not null,	
	fecha_fin_previsto date not null,	
	fecha_inicio date,	
	fecha_fin date,	
	semana_actual integer not null default 0,
	activo boolean not null default false,
	foto text,
	co_sucursal integer not null references co_sucursal(id),
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE co_curso_movimiento
(
	id serial NOT NULL primary key,	
	co_curso integer NOT NULL  references cat_especialidad(id),	
	co_empresa integer NOT NULL  references co_empresa(id),    					
	costo_colegiatura_base numeric not null,
	costo_inscripcion_base numeric not null,	
	nota text not null,
	movimiento text not null,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE co_inscripcion
(
	id serial NOT NULL primary key,	
	co_curso integer NOT NULL  references co_curso(id),    			
	co_empresa integer NOT NULL  references co_empresa(id),    			
	co_alumno integer NOT NULL  references co_alumno(id),    			
	costo_colegiatura numeric not null,
	costo_inscripcion numeric not null,
	nota text,
	terminado boolean not null default false,	
	pagado boolean not null default false,	
	total_pagado numeric not null default 0,	
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);




alter table co_alumno drop column co_grupo;

alter table co_alumno drop column hora_entrada;

alter table co_alumno drop column hora_salida;

alter table co_alumno drop column costo_inscripcion;

alter table co_alumno drop column costo_colegiatura;

alter table co_alumno drop column minutos_gracia;

alter table co_alumno drop column fecha_reinscripcion;

alter table co_alumno drop column fecha_inscripcion;

alter table co_alumno drop column sexo;

alter table co_alumno drop column nombre_carino;

alter table co_alumno drop column co_datos_facturacion;

alter table co_alumno drop column numero_dia_limite_pago;

alter table co_alumno drop column fecha_limite_pago_mensualidad;

alter table co_alumno drop column mostrar_nombre_carino;

alter table co_alumno drop column color;

alter table co_alumno drop column alergias;


alter table co_inscripcion add column co_sucursal integer not null references co_empresa(id);

alter table cat_especialidad add column color text;

alter table co_alumno add column direccion text;
alter table co_alumno add column telefono text;