
update si_opcion set eliminado = false where id in (3,1)


insert into si_rol(ID,si_modulo,nombre,genero) values(8,1,'ADMINISTRADOR',1)

insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero) values(125,1,8,1,1)

INSERT INTO SI_ROL_OPCION (si_rol,si_opcion,genero) 
VALUES (8,1,1),
	  (8,3,1);



