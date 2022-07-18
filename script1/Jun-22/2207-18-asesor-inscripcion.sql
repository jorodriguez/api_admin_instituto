alter table usuario add column visible_catalogo boolean default true;

update usuario set visible_catalogo = false where id in (125,131)

update si_rol set eliminado = true where id in (5)

update si_rol set nombre = 'ASESOR-INSCRIPCIONES' where id = 4


alter table si_rol add column descripcion text;

update si_rol set descripcion = 'Tiene acceso a todas las opciones.' where id = 1;