alter table co_sucursal add column plan_foto_alumnos boolean default false not null;

alter table co_alumno add column foto_agregada boolean default false not null;


CREATE TABLE si_tipo_facturacion_recurso(
	id serial NOT NULL primary key,		
	nombre text not null,	
	precio numeric not null,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);

CREATE TABLE si_facturacion_recursos(
	id serial NOT NULL primary key,			
	si_tipo_facturacion_recurso integer NOT NULL references si_tipo_facturacion_recurso(id),	
	precio numeric not null,	
	co_sucursal integer NOT NULL references co_sucursal(id),	
	nota text,
	texto_ayuda text,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


insert into si_tipo_facturacion_recurso(id,nombre,precio,genero)
values(1,'Sistema',650,1),
	 (2,'Desarrollo Nuevo',1,1),
	 (3,'Alta de Foto',15,1),
	 (4,'Impresión de credencial',0,1);
	 