
--cambios para separacion de especialidades por sucursal, y la configuracion de tema  y correos

--update usuario set correo = 'velocirraptor79@hotmail.com' where id = 134
-
alter table co_sucursal add column configuracion integer not null default 1 references configuracion(id);

alter table co_sucursal add column co_template integer not null default 1 references co_template(id);

update co_sucursal set co_template = 2, configuracion = 2 where co_empresa = 1;

update co_sucursal set co_template = 3, co

alter table co_sucursal add column color_tema text not null default '#E38A2B';

alter table co_sucursal add column logotipo text not null default '';

alter table co_sucursal add column with_logotipo varchar(3) not null default '130';

update co_sucursal set logotipo = foto;


--colores rosas para paris
update co_sucursal set color_tema = '#E701A8' where id in (1,2,3,4,5);

--color azul para cecan
update co_sucursal set color_tema = '#2B74E3' where id in (6);


---------------------- separacion de cargos------------------

alter table co_sucursal add column with_logotipo varchar(3) not null default '130';


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

