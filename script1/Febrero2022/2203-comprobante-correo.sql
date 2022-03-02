

alter table co_sucursal add column enviar_recibo_correo boolean default false;

update co_sucursal set enviar_recibo_correo = true where id = 1;

alter table co_template add column template_correo_bienvenida text default '';

alter table co_template add column template_ticket_venta text default '';


update co_template set template_correo_bienvenida = '

<hr style="border:1px solid #FC8EC4;" />
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
      <td >
      <img width="20%" class="fix" src="{{& logo_taller}}" />
      </td>           
      <td>
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
    
    
</table>
<br/>
<p>* En caso de haber algun detalle con el registro por favor comunicate con nosotros para realizar el cambio.</p>
<br/>
<p><strong>Agradecemos tu confianza</strong></p>
<hr style="border:1px solid #FC8EC4;" />

'
where id  =2;

alter table usuario add column correo_copia text;

delete from co_usuario_notificacion;

delete from co_tema_notificacion WHERE ID > 1;

insert into co_tema_notificacion(id,nombre,genero) values(7,'ALTA_ALUMNO',1);


insert into co_usuario_notificacion(usuario,co_tema_notificacion,co_sucursal,genero) 
values(14,7,1,1), --LIC CARMELO
	  (12,7,1,1),--LIC MANUEL
	  (124,7,1,1), -- LIC LIZ
	  (125,7,1,1); -- ADMIN
