

select * from configuracion

update configuracion set remitente_from = 'InfoEdu<familyconnectinfo1@gmail.com>' where id = 1;

update configuracion set link_descarga_app_android = '',co_empresa =1, configuracion_correo='
{
      "host":"smtp.gmail.com",
      "port":465,
      "secureConnection":true,
      "auth":{
         "user":"instituto.belleza.paris.info@gmail.com",
         "pass":"@@paris86"
      },
      "tls":{
         "ciphers":"SSLv3"
      }
   }'
 ,
 remitente_from = 'Instituto de Belleza París<instituto.belleza.paris.info@gmail.com>' 
 where id = 2;



 ----



update co_tema_notificacion set nombre = 'CORTE DIARIO' where id = 3;

update co_tema_notificacion set eliminado = true where id in (4,5,6);

delete from co_correo_copia_notificacion;

delete from co_usuario_notificacion;

insert into co_usuario_notificacion(usuario,co_tema_notificacion,co_sucursal,genero)
values(14,3,1,1),
	 (12,3,1,1);

insert into co_usuario_notificacion(usuario,co_tema_notificacion,co_sucursal,genero)
values(125,3,1,1)--para el admin 

update usuario set correo='joel.rod.roj@hotmail.com' where id = 125;

update usuario set correo='gruporedi@hotmail.com' where id = 14;

update usuario set correo='lic.manueltiburcio@hotmail.com' where id = 12;







