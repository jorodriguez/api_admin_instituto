
/*
		SCRIPT PARA ALTA DE UNA NUEVA EMPRESA
*/

select * from co_template
--1. dar de alta el template

insert into co_template(id,nombre,encabezado,pie,logo_correo,template_recibo_pago,template_corte_dia,template_correo_bienvenida,template_ticket_venta,genero)
values(4,
	'Template Prepa CECAN',
	(select encabezado from co_template where id = 1),
	(select pie from co_template where id = 1),
	'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.34_PM_ytp9er.jpg',
	(select template_recibo_pago from co_template where id = 1),
	(select template_corte_dia from co_template where id = 1),
	(select template_correo_bienvenida from co_template where id = 1),
	(select template_ticket_venta from co_template where id = 1),
	1
);



INSERT INTO configuracion (id,co_empresa,configuracion_correo,remitente_from,genero) 
VALUES (4,null,'
{
      "host":"smtp.gmail.com",
      "port":465,
      "secureConnection":true,
      "auth":{
         "user":"instituto.belleza.paris.info@gmail.com",
         "pass":"ffeptazccystkwgf"
      },
      "tls":{
         "ciphers":"SSLv3"
      }
   }     
','Instituto de Belleza París<instituto.belleza.paris.info@gmail.com>',1);


--select id,nombre,direccion,telefono,nombre_representante,co_template,configuracion,logotipo,rfc,nombre_folder,copia_oculta,genero from co_empresa where id = 1

INSERT INTO co_empresa (id,nombre,direccion,telefono,
				nombre_representante,co_template,configuracion,logotipo,rfc,nombre_folder,copia_oculta,genero) 
VALUES (3,'GRUPO EMPRESARIAL NORESTE GEN, S.A. DE C.V.',
		'GRUPO EMPRESARIAL NORESTE GEN, S.A. DE C.V.','811000000',
		 'Carmelo Reyes Zuliga',
		 4,--template
		 4,--configuracion
		 'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.34_PM_ytp9er.jpg',
		 'GEN180119HJA','prepa_cecan','joel.rod.roj@hotmail.com',1);


select * from co_sucursal


--======= REGISTRO DE SUCURSALES =======
-- Morelia id= 4
INSERT INTO CO_SUCURSAL(co_empresa,nombre,direccion,class_color,nombre_folder,genero)
VALUES(3,'Prepa CECAN','AV. EVA SAMANO #1810 COL. UNIDAD NACIONAL C.P. 88135.','#FFF','suc_cecan',1) RETURNING ID;

select * from usuario

-----------------------------------------------------------
------------ USUARIO ADMIN -ACCESO A TODO -----------------------
-----------------------------------------------------------
insert into usuario(co_empresa,co_sucursal,
					nombre,
					correo,
					password,
					permiso_gerente,cat_tipo_usuario,hora_entrada,hora_salida,acceso_sistema,sueldo_mensual,sueldo_quincenal,genero)
values(3,6,
	   'Director Cecan',
	   'velocirraptor19@hotmail.com',
	   '$2a$08$XOjFNU1bEQ4YjNm0/jfvJO4CVbqYKy/DZV0B1QtWuwWFcnh2bmKOC',	   
	    false,1,'07:00','20:00',true,0,0,1)	   
	   RETURNING ID;
	   
	   
id=134
director cecan



-- roles para el usuario director
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(134, (select id from co_sucursal where nombre='Prepa CECAN'),2,3,1), --Rol 2 cobranza
	  (134, (select id from co_sucursal where nombre='Prepa CECAN'),4,3,1),--Rol 4 inscripciones
	  (134, (select id from co_sucursal where nombre='Prepa CECAN'),6,3,1),--Rol 6 ventas
	  (134, (select id from co_sucursal where nombre='Prepa CECAN'),7,3,1);--Rol 7 admin articulos


select * from cat_cargo


-------------------------------------
--------LOGO DE LA SUCURSAL---------
----------------------------------
update co_sucursal set foto = 'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.34_PM_ytp9er.jpg'  where id = 6;;


select * from co_consecutivo

-------------------------------------
--------  GENERAR EL CONSECUTIVO  ---------
----------------------------------
-- CONSECUTIVO PARA [RECIBO DE PAGO] : PREFIJO : MO
insert into co_consecutivo(id,nombre,identificador,anio,valor,co_sucursal,co_empresa,prefijo,genero)
values(15,'RECIBO_PAGO_CECAN','RECIBO_PAGO',22,0,6,3,'CEC',1);

-- CONSECUTIVO PARA [MATRICULA] : PREFIJO : MO
insert into co_consecutivo(id,nombre,identificador,anio,valor,co_sucursal,co_empresa,prefijo,genero)
values(16,'MATRICULA_CECAN','MATRICULA',22,0,6,3,'CECAN',1);

-- CONSECUTIVO PARA [MATRICULA] : PREFIJO : MO 
insert into co_consecutivo(id,nombre,identificador,anio,valor,co_sucursal,co_empresa,prefijo,genero)
values(17,'TICKET_VENTA_CECAN','TICKET_VENTA',22,0,6,3,'',1);


update co_sucursal set color_tema = '#1958B9' where id = 6;



--carga de especialidades

INSERT INTO CAT_ESPECIALIDAD (co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (3,6,1,8,'Marketing Digital','Marketing Digital',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.58_PM_augrtl.jpg',true,1);


INSERT INTO CAT_ESPECIALIDAD (co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (3,6,1,8,'Asistente Contable','Asistente Contable',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.38.54_PM_1_wuhamt.jpg',true,1);

INSERT INTO CAT_ESPECIALIDAD (co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (3,6,1,52,'Carrera Téc. en Sistemas Computación Bilingue','Carrera Téc. en Sistemas Computación Bilingue',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.38.54_PM_squjcl.jpg',true,1);

INSERT INTO CAT_ESPECIALIDAD (co_empresa,co_sucursal,cat_duracion,duracion,nombre,descripcion,alumnos_permitidos,foto,activo,genero) 
VALUES (3,6,1,8,'Secretaría Bilingue','Secretaría Bilingue',20,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.38.55_PM_pydy6c.jpg',true,1);



-------------------------------------
--------  LISTA DE DIAS QUE LABORA  ---------
----------------------------------

INSERT INTO CAT_DIA(co_empresa,nombre,numero_dia,genero)
values(3,'Lunes',1,1),
	(3,'Martes',2,1),
	(3,'Míercoles',3,1),
	(3,'Jueves',4,1),
	(3,'Viernes',5,1),
	(3,'Sabado',6,1),
	(3,'Domingo',7,1);



-------------------------------------
--------  LISTA DE CARGOS  ---------
----------------------------------

select * from cat_cargo where co_empresa = 3 and co_sucursal = 6

no se han cargado


-- cobran a 100 pesos el cargo extra por no pagar a tiempo
insert into cat_cargo(co_empresa,co_sucursal,nombre,descripcion,precio,notificar,genero)
values(3,6,'PLAYERA ','',250,true,1);


update configuracion set remitente_from = 'CECAN<instituto.belleza.paris.info@gmail.com>' where id = 4;

update co_sucursal set nombre = 'CENTRO DE CAPACITACIÓN Y NIVELACIÓN DE NUEVO LAREDO. ',
	logotipo='https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.34_PM_ytp9er.jpg'
WHERE ID = 6;





UPDATE co_TEMPLATE 
SET encabezado = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>{{nombre_empresa}}</title>
  <style type="text/css">
  body {margin: 0; padding: 0; min-width: 100%!important;}
  img {height: auto;}
  .content {width: 100%; max-width: 600px;}
  .header {padding: 10px 20px 10px 10px;}
  .innerpadding {padding: 30px 30px 30px 30px;}
  .borderbottom {border-bottom: 1px solid #BBBBBB;}
  .borderbottomTotal {border-top: 2px solid #BBBBBB;}
  .subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
  .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
  .h1 {font-size: 20px; line-height: 38px; }
  .h2 {padding: 0 0 18px 0; font-size: 16px; line-height: 28px; }
  .bodycopy {font-size: 16px; line-height: 28px;}
  .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
  .button a {color: #ffffff; text-decoration: none;}
  .footer {padding: 20px 30px 15px 30px;}
  .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
  .footercopy a {color: #ffffff; text-decoration: underline;}
  @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
  body[yahoo] .hide {display: none!important;}
  body[yahoo] .buttonwrapper {background-color: transparent!important;}
  body[yahoo] .button {padding: 0px!important;}
  body[yahoo] .button a {background-color: #ec378c; padding: 15px 15px 13px!important;}
  body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #ec378c; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
  }
  /*@media only screen and (min-device-width: 601px) {
    .content {width: 600px !important;}
    .col425 {width: 425px!important;}
    .col380 {width: 380px!important;}
    }*/
  </style>
</head>
<body yahoo bgcolor="#FFF">
<table width="100%" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0">
<tr>
  <td>
    <!--[if (gte mso 9)|(IE)]>
      <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
    <![endif]-->     
    <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0" >
    <tr >
        <td class="borderbottom">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="vertical-align: middle;
    text-align: left;">                    				
                <tr>
                    <td   style="padding: 0 20px 20px 0;">
                         <img style="height:90px;width:100px" class="fix" src="{{& logotipo}}" />
                    </td>
                    <td>
                    	<span class="h1">{{nombre_empresa}}</span>                        
                        <p> {{nombre_sucursal}} </p>
                        <p> {{direccion_sucursal}} </p>
                    </td>
                </tr>                
            </table>
        </td>
        </tr>      
      <tr>
        <td class="innerpadding ">
          <!-- BODY -->
'
where id=4



UPDATE co_TEMPLATE 
SET pie = '
  <!-- Esto es el final del template -->
          <!-- BODY -->
        </td>
      </tr>     
      <tr>
        <td class="innerpadding borderbottom">                    
          {{anexo_pie_correo}}          
        </td>
      </tr>     
      <tr>
      <!-- Color de tema  #1958B9 -->
        <td class="footer" bgcolor="#1D96A7">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" class="footercopy">
                &reg; {{nombre_empresa}}<br/>                
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0 0 0;">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                      <a href="http://www.facebook.com/">
                        <img src="https://res.cloudinary.com/dwttlkcmu/image/upload/v1643914638/static-paris/logo-facebook_a9gwbh.png" width="37" alt="Facebook" border="0" />
                      </a>
                    </td>
                    <td width="37" style="text-align: center; padding: 0 10px 0 10px;">
                      <a  href="http://www.twitter.com/">
                        <img src="https://res.cloudinary.com/dwttlkcmu/image/upload/v1643914636/static-paris/instagram_h2u9gj.png" width="37" height="37" alt="Twitter" border="0" />
                      </a>
                    </td>
                  </tr>
                  <tr >
       					<td colspan="2"  style="text-align: center; padding: 10px 10px 0 10px;">
                        <a style="text-decoration: none;" href="http://www.softlineas.com">
                        <small style="color:#fff;">http://www.softlineas.com</small> 
                        </a>
                        </td>
  					</tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>      
    </table>
    <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
    </table>
    <![endif]-->
    </td>
  </tr>  
</table>
<!--analytics-->
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="http://tutsplus.github.io/github-analytics/ga-tracking.min.js"></script>
</body>
</html>     
'
where id=4





UPDATE co_TEMPLATE 
SET template_correo_bienvenida = '


<table width="100%" border="0" style="padding-top:10px" cellspacing="0" cellpadding="0">
    <tr>
        <td class="bodycopy">         
			<p>
            	Hola <strong>{{nombre_alumno}}</strong>,           
            </p>
            <p>
            	Te damos la bienvenida a nuestra institución.
            </p>                        
        </td>
    </tr>
</table>
<p>Por favor revisa tu registro </p>
<table width="100%" border="0" style="padding-top:10px" cellspacing="1" cellpadding="1">
	<tr>
        <td><strong>Matrícula</strong></td>
        <td>{{matricula_alumno}}</td>        
    </tr>    
    <tr>
        <td><strong>Nombre</strong></td>
        <td>{{nombre_alumno}}</td>        
    </tr>
    <tr>
        <td><strong>Apellidos</strong></td>
        <td>{{apellidos_alumno}}</td>        
    </tr>
    <tr>
        <td><strong>Dirección</strong></td>
        <td>{{direccion_alumno}}</td>        
    </tr>
    <tr>
        <td><strong>Correo</strong></td>
        <td>{{correo_alumno}}</td>        
    </tr>
    <tr>
        <td><strong>Teléfono</strong></td>
        <td>{{telefono_alumno}}</td>        
    </tr>
    <tr>
        <td><strong>F. Nacimiento</strong></td>
        <td>{{fecha_nacimiento_alumno}}</td>        
    </tr>    
</table>
<br/>
<p><strong>Inscripción {{fecha_inscripcion}}</strong></p>
<table width="100%" border="0" style="padding-top:10px" cellspacing="1" cellpadding="1">
	<tr>
      <td style="text-align: center; vertical-align: middle;" >
      <img width="30%" class="fix" src="{{& logo_taller}}" />
      </td>           
      <td>
     </tr>
     <tr>
    <table width="100%" border="0" style="padding-top:10px" cellspacing="1" cellpadding="1">
    	<tr><td><strong>{{nombre_taller}}</strong></td>               </tr>
        <tr>
    	<td><strong>{{horario_taller}}</strong></td>             
    </tr>
    <tr>
    <td><strong>Día {{dia_taller}}</strong></td>        
    </tr>
    <tr>
    <td ><strong>{{sucursal}}</strong></td>        
    </tr>
    </table>
    </td>
    </tr> 
    	<tr>
    		<td>
            <p>* En caso de haber algun detalle con el registro por favor comunicate con nosotros para realizar el cambio.</p>
            </td>
        </tr>
        <tr>
        	<td>
            <p><strong>Agradecemos tu confianza</strong></p>
            </td>
        </tr>     
</table>
'
where id=4



update co_sucursal set nombre = 'CECAN.' where id = 6




-- cecan= 5
INSERT INTO co_usuario_notificacion (usuario,co_tema_notificacion,co_sucursal,genero) 
VALUES (14,2,6,1),--pagos
		(14,3,6,1) ,-- corte
		(14,7,6,1); --alta
