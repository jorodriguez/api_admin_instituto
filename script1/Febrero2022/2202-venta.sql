

CREATE TABLE cat_marca
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE cat_tipo_movimiento
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	nombre text not null, 
	descripcion text,
	afectacion varchar(15)  check (afectacion = 'ENTRADA' or afectacion = 'SALIDA') ,--//salida
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE cat_cliente
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL references co_empresa(id),		
	co_sucursal integer NOT NULL references co_sucursal(id),		
	nombre text not null, 
	correo text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


CREATE TABLE cat_unidad_medida
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


drop table cat_articulo_sucursal




CREATE TABLE cat_articulo
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	cat_marca integer NOT NULL  references cat_marca(id),						
	codigo text not null,
	nombre text not null, 
	descripcion text,			
	foto text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE cat_articulo_sucursal
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),				
	cat_articulo integer NOT NULL  references cat_articulo(id),						
	precio numeric not null default 1,
	costo_base numeric not null default 0,
	cantidad_existencia numeric not null default 0,
	stock_minimo numeric not null default 0,	
	nota_interna text,			
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


CREATE TABLE ve_venta
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	cat_cliente integer NOT NULL  references cat_cliente(id),				
	folio text not null,
	fecha timestamp without time zone DEFAULT (getDate('')+getHora('')),
	cantidad_articulos numeric not null,		
	total numeric not null,
	recibido numeric not null,
	cambio numeric not null,
	nota_venta text,	
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE ve_venta_detalle
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	ve_venta integer NOT NULL  references ve_venta(id),				
	cat_articulo_sucursal integer NOT NULL  references cat_articulo_sucursal(id),					
	cantidad numeric not null,		
	precio numeric not null,
	importe numeric not null,					
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE ve_movimiento
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	cat_tipo_movimiento integer NOT NULL  references cat_tipo_movimiento(id),				
	cat_articulo_sucursal integer NOT NULL  references cat_articulo_sucursal(id),					
	cantidad numeric not null,				
	cantidad_anterior numeric not null,				
	cantidad_posterior numeric not null,				
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE cat_categoria
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


alter table  cat_tipo_movimiento add column sistema boolean default false;

alter table  cat_articulo add column cat_categoria integer not null references cat_categoria(id);

insert into cat_tipo_movimiento(id,nombre,descripcion,afectacion,co_empresa,genero)
values(1,'VENTA','ventas al publico','SALIDA',1,1),
      (2,'COMPRAS','ventas al publico','ENTRADA',1,1),
      (3,'AJUSTE','Ajuste del inventario','ENTRADA',1,1),
      (4,'AJUSTE','Ajuste del inventario','SALIDA',1,1);

insert into cat_marca(nombre,descripcion,co_empresa,genero)
values('SIN MARCA','SIN MARCA',1,1);


insert into cat_categoria(nombre,descripcion,co_empresa,genero)
values('SIN CATEGORIA','SIN CATEGORIA',1,1);


insert into cat_articulo(codigo,nombre,descripcion,foto,co_empresa,cat_marca,cat_categoria,genero)
values('01','PRODUCTO DE PRUEBA','Es un producto de prueba - esto es la descripción',null,1,1,1,1);



insert into cat_articulo_sucursal(co_empresa,co_sucursal,cat_articulo,precio,costo_base,cantidad_existencia,stock_minimo,nota_interna,genero)
values(1,1,(select id from cat_articulo where codigo ='01'),1,1,100,10,'es un producto de prueba',1);



insert into cat_marca(nombre,descripcion,co_empresa,genero)
values('REVLON','REVLON',1,1);

insert into cat_categoria(nombre,descripcion,co_empresa,genero)
values('TINTES','TINTES',1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'02'
		,'Colorsilk Beautiful Color - Tinte permanente para el cabello de alta definición y larga duración, brillo y suavidad sedosa con cobertura del 100 % de las canas, sin amoníaco, rubio sol ultraclaro 003, paquete de 1 unidad'		 
		,'Tinte permanente con la calidad de la peluquería, pero en tu casa: Práctico kit de teñido del cabello para uso hogareño desarrollado por expertos de peluquería para lograr resultados duraderos.'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645130301/paris/articulos/81UlNjOeXJL._SL1500__twn64y.jpg'
		,(select id from cat_marca where  nombre ='REVLON')
		,(select id from cat_categoria where  nombre ='TINTES')
		,1,1);
insert into cat_articulo_sucursal(co_empresa,co_sucursal,cat_articulo,precio,costo_base,cantidad_existencia,stock_minimo,nota_interna,genero)
values(1,1,(select id from cat_articulo where codigo ='02'),45,25,100,10,'es un producto de prueba',1);
------------------ROLES y OPCION

insert into si_rol(id,si_modulo, nombre,genero)
values(6,1,'VENTAS',1);

--registro de opcion
select * from si_opcion

insert into si_opcion(id,si_modulo,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(12,1,'Ventas','Venta','fas fa-barcode',6,true,1);


select * from si_rol_opcion

--agregando opcion para el rol ventas
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(6,12,1); -- ventas para rol ventas



select * from usuario


-- rol para usuarios vendedores
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,1,6,1,1),--para admin
	 (16,1,6,1,1), -- para yesica
	 (13,1,6,1,1); -- para direccion


insert into cat_cliente(id,co_empresa,co_sucursal,nombre,correo,genero)
values(1,1,1,'MOSTRADOR','',1);