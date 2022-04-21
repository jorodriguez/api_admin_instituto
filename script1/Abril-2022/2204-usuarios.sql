update si_rol set nombre = 'Administracion' where id = 5;

--insert paa el admin joel
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,1,5,1,1),(125,2,5,1,1)

update si_opcion set eliminado = false where id in (1,3);

insert into si_rol_opcion(si_rol,si_opcion,genero)
values(5,1,1),(5,3,1);