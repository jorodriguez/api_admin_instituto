
-- Script 2 - son modificaciones a datos

update cat_genero set nombre = 'Hombre', foto='https://static.vecteezy.com/system/resources/previews/002/508/442/non_2x/avatar-male-man-portrait-cartoon-character-line-and-fill-style-icon-free-vector.jpg' where id = 4;
update cat_genero set nombre = 'Mujer', foto='https://st3.depositphotos.com/11953928/35426/v/1600/depositphotos_354263092-stock-illustration-avatar-woman-female-character-portrait.jpg' where id = 5;

insert into co_grupo(nombre,color,co_empresa,genero)
values('Diseñadora de imagen profesional','#BF4B7A',3,1),
	 ('Diplomado en Barberia','#BF4B7A',3,1),
	 ('Diplomado en Uñas','#BF4B7A',3,1),
	 ('Diplomado en Maquillaje','#BF4B7A',3,1),
	 ('Diplomado en Cosmetología','#BF4B7A',3,1),
	 ('Diplomado en Colorimetría','#BF4B7A',3,1);