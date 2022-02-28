
insert into cat_marca(id,nombre,descripcion,co_empresa,genero) values(5,'NO MARCA','NO MARCA',1,1);

insert into cat_categoria(id,nombre,descripcion,co_empresa,genero) values(3,'KIT','KIT',1,1);

insert into cat_categoria(id,nombre,descripcion,co_empresa,genero) values(4,'SERVICIO','SERVICIO',1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'001'
		,'Kit de Maquillaje'		 
		,'Kit de Maquillaje'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735062/paris/articulos/kit_siz6rh.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);


insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'002'
		,'Kit de Uñas'		 
		,'Kit de Uñas'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'003'
		,'Kit de Faciales'		 
		,'Kit de Faciales'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'004'
		,'Kit de Peinados'		 
		,'Kit de Peinados'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'005'
		,'Kit de Corte de Cabello'		 
		,'Kit de Corte de Cabello'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'006'
		,'Kit de Tratamientos capilares'		 
		,'Kit de Tratamientos capilares'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);


insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'007'
		,'Kit de Pestañas'		 
		,'Kit de Pestañas'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);


insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'008'
		,'Kit de Depilación'		 
		,'Kit de Depilación'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'009'
		,'Kit de Extensiones'		 
		,'Kit de Extensiones'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735184/paris/articulos/kit-solo_km92rj.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'010'
		,'Playera'		 
		,'Playera'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735445/paris/articulos/playera_vw7bm6.jpg'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'020'
		,'Servicio de renta '		 
		,'Servicio de renta '
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645735610/paris/articulos/serv_b5oxsd.png'
		,(select id from cat_marca where  nombre ='NO MARCA')
		,(select id from cat_categoria where  nombre ='KIT')
		,1,1);

			
insert into cat_articulo_sucursal(co_empresa,co_sucursal,cat_articulo,precio,costo_base,cantidad_existencia,stock_minimo,nota_interna,genero)
values(1,1,(select id from cat_articulo where codigo ='001'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='002'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='003'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='004'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='005'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='006'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='007'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='008'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='010'),5,5,100,10,'es un producto de prueba',1),
	(1,1,(select id from cat_articulo where codigo ='020'),5,5,100,10,'es un producto de prueba',1);