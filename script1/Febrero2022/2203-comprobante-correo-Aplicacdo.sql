
select * from usuario


update  usuario set password = '$2a$08$XOjFNU1bEQ4YjNm0/jfvJO4CVbqYKy/DZV0B1QtWuwWFcnh2bmKOC';

update usuario set correo = '_'||correo where id in (12,14);


alter table co_sucursal add column enviar_recibo_correo boolean default false;

update co_sucursal set enviar_recibo_correo = true where id = 1;

alter table co_template add column template_correo_bienvenida text default '';

alter table co_template add column template_ticket_venta text default '';

alter table usuario add column correo_copia text;


insert into co_tema_notificacion(id,nombre,genero) values(7,'ALTA_ALUMNO',1);


insert into co_usuario_notificacion(usuario,co_tema_notificacion,co_sucursal,genero) 
values(14,7,1,1), --LIC CARMELO
	  (12,7,1,1),--LIC MANUEL
	  (124,7,1,1), -- LIC LIZ
	  (125,7,1,1); -- ADMIN



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



update co_template set template_recibo_pago ='

<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<style type="text/css" media="print">
{{#estilo_ticket}}
#print {
 height: auto;
 width: 310px;
 margin: 0px 0px 10px 0px;
 padding: 10px;     
 font-size:.25em !important; 
}  
{{/estilo_ticket}}
{{^estilo_ticket}}
  #print {
 height: auto;
 width: auto;
 margin: 0px 0px 10px 0px;
 padding: 10px;      
} 
{{/estilo_ticket}}

@page{
   margin: 10;
}
</style>
</head>
<body>
<table id="print" border="0" cellspacing="0" cellpadding="0">
	<tr>
        <td style="border-bottom: 1px solid gray;">
        	<table width="100%" border="0" cellspacing="3" cellpadding="3">
            	<tr>
                	<td>
                    	 <img style="height:70px;" src="{{& logotipo}}" />
                    </td>
                    <td  width="30%"  align="right">
                    	<table width="100%" style="height: 70px;border: 1px solid black;text-align: center; border-radius: 5px;"  cellspacing="1">
                        	<tr >
                            <td style="border-bottom: 0px solid gray;text-align: center;">
                    				<strong>Recibo</strong>
                                </td>
                            </tr>
                            <tr>
                            	<td>
                    			<strong>{{folio}}</strong>
                                </td>
                            </tr>
                        </table>
                    </td>                    
                </tr>
            </table>            
        </td>        
    </tr>
    <tr>
        <td style="border-bottom: 1px solid gray;">          
         <table width="100%"  style="height: 70px;border: 0px solid black;text-align: left;"  border="0" cellspacing="0" cellpadding="0">
            	<tr><td><small>{{nombre_empresa}}</small></td></tr>
                <tr><td>{{rfc}}<tr><td>
                <tr><td>{{nombre_sucursal}}<tr><td>
                <tr><td>{{direccion_sucursal}}<tr><td>
                <tr><td>{{telefono_sucursal}}<tr><td>               
            </table>                          
        </td>
    </tr>   
    <tr>
        <td style="border-bottom: 1px solid gray;">
        <!-- datos alumno -->
        <table width="100%"  style="border: 0px solid black;text-align: left;"   border="0" cellspacing="3" cellpadding="3">
            	<tr>
                	<td width="15%">
                    	<p><strong>Alumno</strong></p>                        
                    </td>                 
                    <td>
                    	<p>{{nombre_alumno}} {{apellidos_alumno}}</strong></p>                                            </td>                 
                </tr>                           
            </table>          
        </td>
    </tr>
    <tr>
        <td style="border-bottom: 1px solid gray;">
            <br/>
            <table width="100%" style="background-color:white">
                <tr>
                    <td  width="15%"><strong>Fecha</strong></td>
                    <td>{{fecha}}</td>
                </tr>
                <tr>
                    <td><strong>Forma de Pago</strong></td>
                    <td>{{forma_pago}}</td>
                </tr>               
            </table>
            <br/>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <tr>
                    <th  style="border-bottom:1pt solid #57A8B6;text-align: left;" >Descripción</th>                    
                    <th style="border-bottom:1pt solid #57A8B6;" width="10%">Cant.</th>
                    <th style="border-bottom:1pt solid #57A8B6;text-align:right" width="15%" align="right">Cargo</th>                    
                    <th style="border-bottom:1pt solid #57A8B6;text-align:right" width="15%" align="right">Pagado</th>
                    <th style="border-bottom:1pt solid #57A8B6;text-align:right" width="15%" align="right">Adeuda</th>                   
                </tr>                
                {{#cargos}}
                <!-- IF -->
                <tr style="text-align:left">
                    <td colspan="5">{{nombre_cargo}}                   
                   {{#especialidad}}             
                 <span >{{especialidad}}</span>
                  {{/especialidad}}
                  {{#numero_semana_curso}}             
                 <span > -- {{numero_semana_curso}}</span>
                 {{/numero_semana_curso}}                            
                 </td>
                 </tr>
                 <tr style="text-align:right">
                    <td colspan="2" style="border-bottom:1pt solid #57A8B6;">{{cantidad}}</td>
                    <td style="border-bottom:1pt solid #57A8B6;text-align:right" align="right">${{cargo}}</td>                    
                    <td style="border-bottom:1px solid #57A8B6;text-align:right" align="right">${{total_pagado}}</td>
                    <td style="border-bottom:1px solid #57A8B6;text-align:right" align="right">${{total}}</td>
                    <!--<td>{{nota}}</td>-->
                </tr>
                {{/cargos}}
                <tr>
                    <td colspan="4" style="text-align:right">
                        <strong>Pago recibido:</strong>
                    </td>
                    <td style="border-bottom:2pt solid #57A8B6;text-align:right;background-color:#F7F7F7" valign="center" align="right">
                        <h4><strong> ${{pago}}</strong> </h4>
                    </td>
            </tr>
          </table>
        </td>
      </tr>   
      <!-- mensaje final -->
       <tr>
        <td >      
        	<br/>
        	<table width="100%" style="text-align: center;"   border="0" >
            	<tr>
                	<td>
                    	<p>Atendió {{nombre_usuario}}</p> 
                        <p><strong>¡Gracias por su confianza¡</strong></p> 
                        <small>{{fecha_impresion}}</small> 
                	</td>
                </tr>                                                                       
         	</table>              
         	<br/>
         	<br/>
         	<br/>
        </td>
    </tr>    
      <!-- fin mensaje final-->                
</table>
</body>
</html>

'
where id =2;



update co_template set template_corte_dia ='

<!DOCTYPE html>
<html>
<head>
<title>Recibo pago</title>
<style type="text/css" media="print">
#print {
 height: auto;
 width: 310px;
 margin: 0px 0px 10px 0px;
 padding: 10px;     
  font-size:.25em !important;
 /*float: left;
 font-family: Arial, Helvetica, sans-serif;
 font-size: 7px;
 font-style: normal;
 line-height: normal;
 font-weight: normal;
 font-variant: normal;
 text-transform: none;
 color: #000;*/
}
@page{
   margin: 10;
}
</style>
</head>
<body>
<table id="print" border="0" cellspacing="0" cellpadding="0">
	<tr>
        <td style="border-bottom: 1px solid gray;">
        	<table width="100%" border="0" cellspacing="3" cellpadding="3">
            	<tr>
                	<td>
                    	 <img style="height:70px;" src="{{& logotipo}}" />
                    </td>
                    <td  width="30%"  align="right">
                    	<table width="100%" style="height: 70px;border: 1px solid black;text-align: center; border-radius: 5px;"  cellspacing="1">
                        	<tr >
                            <td style="border-bottom: 0px solid gray;text-align: center;">
                    				<strong>Corte</strong>
                                </td>
                            </tr>
                            <tr>
                            	<td>
                    			<small>
                                	<strong>{{dia_corte_inicio}}</strong>
                                </small>                                
                               </td>
                            </tr>
                            <tr>
                            	<td>                    			
                                
                                	al
                                
                               </td>
                            </tr>
                            <tr>
                            	<td>
                                <small>
                                	<strong>{{dia_corte_fin}}</strong>
                                </small>
                                </td>
                            </tr>
                        </table>
                    </td>                    
                </tr>
            </table>            
        </td>        
    </tr>
    <tr>
        <td style="border-bottom: 1px solid gray;">          
          <table width="100%"  style="height: 70px;border: 0px solid black;text-align: left;"  border="0" cellspacing="0" cellpadding="0">
            	 <tr><td><small>{{nombre_empresa}}</small></td></tr>
                <tr><td>{{rfc}}<tr><td>
                <tr><td>{{nombre_sucursal}}<tr><td>
                <tr><td>{{direccion_sucursal}}<tr><td>
                <tr><td>{{telefono_sucursal}}<tr><td>               
            </table>                           
        </td>
    </tr>   
    <!--<tr>
        <td >         
        <table width="100%"  style="border: 0px solid black;text-align: left;"   border="0" cellspacing="3" cellpadding="3">
            	<tr>
                	<td width="20%">                    	 
                        <p><strong>Fecha</strong></p>    
                    </td>                 
                    <td>
                    	<p>{{fecha_corte}}</p>  
                    </td>
                </tr>                   
            </table>          
        </td>
    </tr>-->
     <tr>
        <td style="border-bottom: 2px solid #000;border-top: 2px solid #000;">
        <!-- datos de corte -->
        <table width="100%"  style="border: 0px solid black;text-align: left;"   border="0" cellspacing="3" cellpadding="3">
            	<tr >
                	<td style="border-bottom: 1px solid gray;" width="70%">
                    	<span><strong>+Ingreso</strong></span>                       
                    </td>                 
                    <td style="border-bottom: 1px solid gray;"  align="left">
                    	<span><strong>${{total_ingreso}}</strong></span> 
                    </td>
                </tr>   
                <tr>
                	<td width="70%">
                    	<span><strong>-Gasto</strong></span>                       
                    </td>                 
                    <td  align="left">
                    	<span><strong>${{total_gasto}}</strong></span> 
                    </td>
                </tr>                  
            </table>          
        </td>
    </tr>    
     <!-- total en caja -->
       <tr>
        <td >      
        	<br/>
        	<table width="100%" style="text-align: center;"   border="0" >
            	<tr>
                	<td>
                    	<p>Total de caja</p> 
                        <h1><strong>${{total_caja}}</strong></h1>                        
                	</td>
                </tr>                                                                       
         	</table>                       	
        </td>
    </tr>    
      <!-- fin total en caja-->          
      <!-- mensaje final -->
       <tr>
        <td >      
        	<br/>
        	<table width="100%" style="text-align: center;"   border="0" >
            	<tr>
                	<td>
                    	<p>Imprimió {{usuario_imprime}}</p> 
                        <p><strong>¡Gracias por su confianza¡</strong></p> 
                        <small>{{fecha_impresion}}</small> 
                	</td>
                </tr>                                                                       
         	</table>              
         	<br/>         	
        </td>
    </tr>    
      <!-- fin mensaje final-->                
</table>
</body>
</html>


'
where id =2