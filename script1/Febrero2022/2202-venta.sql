

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
	co_sucursal integer NOT NULL  references co_sucursal(id),				
	cat_marca integer NOT NULL  references cat_marca(id),						
	codigo text not null,
	nombre text not null, 
	descripcion text,		
	precio numeric not null default 1,
	costo_base numeric not null default 0,
	cantidad_existencia numeric not null default 0,
	stock_minimo numeric not null default 0,	
	nota_interna text,		
	foto text,
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
	cat_articulo integer NOT NULL  references cat_articulo(id),					
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
	cat_articulo integer NOT NULL  references cat_articulo(id),					
	cantidad numeric not null,				
	cantidad_anterior numeric not null,				
	cantidad_posterior numeric not null,				
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);
