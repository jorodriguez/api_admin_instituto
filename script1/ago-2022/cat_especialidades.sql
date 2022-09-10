select * from usuario

select * from si_rol

select * from si_opcion

insert into si_opcion(id,si_modulo,si_opcion,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(15,1,1,'Especialidades','Especialidades','fas fa-graduation-cap',2,false,1);

select * from si_rol_opcion where si_opcion in (3,15)

--relacion de opcion y rol administrador
insert into si_rol_opcion(si_rol,si_opcion,genero) values(8,15,1)

