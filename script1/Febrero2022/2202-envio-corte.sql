

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


update co_sucursal set eliminado = true where id in (2,3);

-------

update co_template 
set pie = '                       
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
      <!-- Color de tema  -->
        <td class="footer" bgcolor="#ec378c">
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
                      <a href="http://www.twitter.com/">
                        <img src="https://res.cloudinary.com/dwttlkcmu/image/upload/v1643914636/static-paris/instagram_h2u9gj.png" width="37" height="37" alt="Twitter" border="0" />
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
,
encabezado='
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
                         <img style="height:70px;width:100px" class="fix" src="{{& logotipo}}" />
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
where id = 2;


