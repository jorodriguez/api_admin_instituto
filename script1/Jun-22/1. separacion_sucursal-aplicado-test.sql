




--cambios para separacion de especialidades por sucursal, y la configuracion de tema  y correos

--update usuario set correo = 'velocirraptor79@hotmail.com' where id = 134

/*alter table co_sucursal add column configuracion integer not null default 1 references configuracion(id);

alter table co_sucursal add column co_template integer not null default 1 references co_template(id);

update co_sucursal set co_template = 2, configuracion = 2 where co_empresa = 1;

select * from 

update co_sucursal set co_template = 3, -*/

alter table co_sucursal add column color_tema text not null default '#E38A2B';

alter table co_sucursal add column logotipo text not null default '';

alter table co_sucursal add column with_logotipo varchar(3) not null default '130';

update co_sucursal set logotipo = foto;


--colores rosas para paris
update co_sucursal set color_tema = '#E701A8' where id in (1,2,3,4,5);

--color azul para cecan
update co_sucursal set color_tema = '#2B74E3' where id in (6);


---------------------- separacion de cargos------------------


alter table cat_cargo add column co_sucursal integer references co_sucursal(id);

--eliminar los cargos que no han sido usados
update cat_cargo set eliminado = true,descripcion = 'eliminado por la actualización de la separacion por sucrusal ' where id in (select id from cat_cargo where id not in (select distinct cat_cargo from co_cargo_balance_alumno))



--- actualizar los cargos existentes de la sucursal de apodaca con su nuevo catalogo

-- actualizar el serial 

--ALTER SEQUENCE  cat_cargo_id_seq RESTART WITH 1020;



--- actualizar los cargos existentes de la sucursal de apodaca con su nuevo catalogo

-- actualizar el serial 

--ALTER SEQUENCE  cat_cargo_id_seq RESTART WITH 1020;

select id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero 
from cat_cargo 
where eliminado = false and id not in (1,2)


update cat_cargo set sistema = false where id in (1006,1005);

update cat_cargo set co_empresa = null, co_sucursal = null where sistema = true

---------------
-- Actualizacion de cargos para la sucursal de apodaca
----------

-- 1000
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1021,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Uniforme','Uniforme completo.',280,false,true,true,1);

update co_cargo_balance_alumno set cat_cargo = 1021 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1000);

-- 1001 
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1022,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Kit Material Cosmetología','Cuota de Material',4800,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1022 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1001);


--1003
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1023,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Pagos de semanas anteriores al Sistema','Pagos de semanas anteriores al Sistema',1,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1023 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1003);

--1004
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1024,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Pagos anteriores al Sistema','Pagos anteriores al Sistema',1,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1024 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1004);

--1005
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1025,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Título','Trámite de título',2500,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1025 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1005);

--1006
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1026,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Graduación','Graduación',1,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1026 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1006);

--1014
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1027,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Renta de estación de trabajo','',1,false,false,true,1);

update co_cargo_balance_alumno set cat_cargo = 1027 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1014);

--1002
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1028,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Gafete','Gafete',150,false,false,false,1);

update co_cargo_balance_alumno set cat_cargo = 1028 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1002);

--1016
INSERT INTO cat_cargo (id,co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) VALUES (1029,1,(select id from co_sucursal where nombre = 'Campus Apodaca'),'Constancias de estudios','Gafete',150,true,false,false,1);

update co_cargo_balance_alumno set cat_cargo = 1029 where id in (select id from co_cargo_balance_alumno where cat_cargo = 1016);




-------------------------- ACTUALIZAR LOS CARGOS DE LA SUC MTY--------------


update cat_cargo set co_sucursal = 1 where id in (1001,
1003,
1004,
1014,
1002,
1016,
1000,
1006,
1005
);




--------------------- carga de cargos para morelia -------------------------------


select max(id) from cat_Cargo

ALTER SEQUENCE  cat_cargo_id_seq RESTART WITH 1030;


-- 1000
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Uniforme','Uniforme completo.',280,false,true,true,1);


-- 1001 
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Kit Material Cosmetología','Cuota de Material',4800,false,false,true,1);


--1003
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Pagos de semanas anteriores al Sistema','Pagos de semanas anteriores al Sistema',1,false,false,true,1);

--1004
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (1,(select id from co_sucursal where nombre = 'Campus Morelia'),'Pagos anteriores al Sistema','Pagos anteriores al Sistema',1,false,false,true,1);


--1005
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Título','Trámite de título',2500,false,false,true,1);


--1006
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero)
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Graduación','Graduación',1,false,false,true,1);


--1014
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Renta de estación de trabajo','',1,false,false,true,1);


--1002
INSERT INTO cat_cargo (co_empresa,co_sucursal,nombre,descripcion,precio,notificar,escribir_cantidad,escribir_monto,genero) 
VALUES (2,(select id from co_sucursal where nombre = 'Campus Morelia'),'Gafete','Gafete',150,false,false,false,1);









-------------////////////////////SEPARACION DE LAS ESPECIALIDADES ////////////


alter table cat_especialidad add column co_sucursal integer references co_sucursal(id);


--id=2
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (20,1,2,1,18,'Diplomado de Barbería','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1641860827/static/Captura_de_pantalla_de_2022-01-10_18-26-10_gmdp4d.png',true,1);

update co_curso set cat_especialidad = 20, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 2 and co_empresa = 1 and co_sucursal =2);

update cat_especialidad set co_sucursal = 2 where id = 20;

--id=3 para apodaca es el 21
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (21,1,2,1,18,'Diplomado de Uñas','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1641860827/static/Captura_de_pantalla_de_2022-01-10_18-26-29_okolnf.png',true,1);

update co_curso set cat_especialidad = 21, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 3 and co_empresa = 1 and co_sucursal =2);

update cat_especialidad set co_sucursal = 2 where id = 21;

--id=4 para apodaca es el 22
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (22,1,2,1,18,'Diplomado de Maquillaje','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1641860827/static/Captura_de_pantalla_de_2022-01-10_18-25-43_opvqbc.png',true,1);

update co_curso set cat_especialidad = 22, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 4 and co_empresa = 1 and co_sucursal =2);

update cat_especialidad set co_sucursal = 2 where id = 22;

--id=5 para apodaca es el 23
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (23,1,2,1,18,'Diplomado de Cosmetología','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 23, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 5 and co_empresa = 1 and co_sucursal =2);

--id=6 para apodaca es el 24
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (24,1,2,1,18,'Diplomado de Colorimetría','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 24, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 6 and co_empresa = 1 and co_sucursal =2);

--id=7 para apodaca es el 25
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (25,1,2,1,4,'Taller Cejas y Pestañas','Taller',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 25, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 7 and co_empresa = 1 and co_sucursal =2);

--id=8 para apodaca es el 26
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (26,1,2,1,12,'Diplomado Corte de cabello','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 26, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 8 and co_empresa = 1 and co_sucursal =2);

--id=9 para apodaca es el 27
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (27,1,2,1,16,'Diplomado de Maquillaje y Peinado','Diplomado ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 27, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 9 and co_empresa = 1 and co_sucursal =2);

--id=10 para apodaca es el 28
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (28,1,2,1,4,'Taller de Alaciados','Taller ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 28, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 10 and co_empresa = 1 and co_sucursal =2);


--id=11 para apodaca es el 29
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (29,1,2,1,2,'Taller Esmaltado Semipermanente','Taller ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 29, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 11 and co_empresa = 1 and co_sucursal =2);


--id=12 para apodaca es el 30
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (30,1,2,1,1,'Pagos anteriores al sistema','Pagos anteriores al sistema',20,null,true,1);

update co_curso set cat_especialidad = 30, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 12 and co_empresa = 1 and co_sucursal =2);


--id=13 para apodaca es el 31
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (31,1,2,1,4,'Pedicure','Pedicure',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1653849933/static/WhatsApp_Image_2022-05-29_at_1.44.13_PM_kf7awd.jpg',true,1);

update co_curso set cat_especialidad = 31, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 13 and co_empresa = 1 and co_sucursal =2);

--id=1
INSERT INTO CAT_ESPECIALIDAD (id,co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (32,1,2,1,76,'Carrera de Diseñadora de Imagen Profesional','Carrera ',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png',true,1);

update co_curso set cat_especialidad = 32, fecha_modifico=current_timestamp, modifico= 1 
where id in (select id from co_curso where cat_especialidad = 1 and co_empresa = 1 and co_sucursal =2 );



ALTER SEQUENCE  cat_especialidad_id_seq RESTART WITH 33;

--//////separando la sucursal de morelia

update cat_especialidad set co_sucursal = 4, modifico=1, fecha_modifico = current_date where co_empresa = 2;


--//////separando la sucursal de monterrey
update cat_especialidad set co_sucursal = 1, modifico=1, fecha_modifico = current_date where co_empresa = 1 and co_sucursal is null;

-- morelia= 4
INSERT INTO co_usuario_notificacion (usuario,co_tema_notificacion,co_sucursal,genero) 
VALUES (131,2,4,1),--pagos
		(131,3,4,1) ,-- corte
		(131,7,4,1); --alta

-- toluca= 5
INSERT INTO co_usuario_notificacion (usuario,co_tema_notificacion,co_sucursal,genero) 
VALUES (131,2,5,1),--pagos
		(131,3,5,1) ,-- corte
		(131,7,5,1); --alta



update cat_especialidad set foto = 'https://res.cloudinary.com/dwttlkcmu/image/upload/v1640639519/static/thumbnail_LOGO_PARIS_aw1o2o.png' where id = 17