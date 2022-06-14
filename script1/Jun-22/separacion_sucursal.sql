
--cambios para separacion de especialidades por sucursal, y la configuracion de tema  y correos

update usuario set correo = 'velocirraptor79@hotmail.com' where id = 134

alter table configuracion add column color_tema text not null default '#195C9F';


alter table co_sucursal add column configuracion integer not null default 1 references configuracion(id);

alter table co_sucursal add column co_template integer not null default 1 references co_template(id);

update co_sucursal set co_template = 2, configuracion = 2 where co_empresa = 1;

update co_sucursal set co_template = 3, co