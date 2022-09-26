select * from usuario

select * from si_rol

select * from si_opcion

insert into si_opcion(id,si_modulo,si_opcion,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(15,1,1,'Especialidades','Especialidades','fas fa-graduation-cap',2,false,1);

select * from si_rol_opcion where si_opcion in (3,15)

--relacion de opcion y rol administrador
insert into si_rol_opcion(si_rol,si_opcion,genero) values(8,15,1)

//--------------------------------------------cambio para imprimir las listas de los alumnos-----------------------------

alter table co_template add column template_lista_alumnos text;

update co_template set template_lista_alumnos = '
<!DOCTYPE html>
<html>
<head>
<title>Recibo pago CECAN</title>
<style type="text/css" media="print">
#print {
/* height: auto;
 width: auto;
 margin: 0px 0px 10px 0px;
 padding: 10px;      */
}

body  
{ 
    /* this affects the margin on the content before sending to printer */ 
    margin: 0px;  
  
} 
@page{
    size: A4;

    /* this affects the margin in the printer settings */ 
    margin: 10mm 5mm 10mm 5mm;      
}
@media print {
.page { margin: 0; border: initial; border-radius: initial; width: initial; min-height: initial; box-shadow: initial; background: initial; page-break-after: always; } }


</style>
</head>
<body>
<table id="print" border="0" style="; border: 1px solid #000" cellspacing="2" cellpadding="0">
	<tr >
        <td style="border-bottom: 1px solid gray;">
        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
            	<tr  >
                	<td>                    	 
                        <table width="100%" 
                        	  style="height: 130px;border: 1px solid black;text-align: center; border-radius: 5px;"  cellspacing="1">
                        	<tr >
                            	<td rowspan="4" style="text-align: left;">
                    				<!--<img src="{{& logotipo}}" />-->
                                    <img style="height: 120px" src="https://res.cloudinary.com/dwttlkcmu/image/upload/v1655236198/static/oferta_educativa_cecan/WhatsApp_Image_2022-06-11_at_4.36.34_PM_ytp9er.jpg"/>
                                </td>
                             </tr>
                             <tr style="text-align: left;">
                                <td>
                                	<strong>CENTRO DE CAPACITACIÓN Y NIVELACIÓN DE NUEVO LAREDO</strong>
                                </td>
                             <tr style="text-align: left;">
                                <td>
                                	{{nombre_sucursal}} {{direccion_sucursal}}
                                </td>
                              </tr>
                              <tr style="text-align: left;">
                                <td>
                                	{{telefono_sucursal}}
                                </td>
                            </tr>                            
                        </table>
                        
                    </td>
                                       
                </tr>
            </table>            
        </td>        
    </tr>
    
    <tr  >
        <td style="padding-left:5px;">
        <!-- datos alumno -->
        <table width="100%" style="text-align: left;padding-top:5px;"   border="0" cellspacing="0" cellpadding="0">
            	<tr >
                	<td width="15%">
                    	<strong>Grupo</strong>
                    </td>                 
                    <td>
                    	<p>{{nombre_alumno}} </p>                                           		</td>                                 
                   <td><strong>Turno</strong></td>
                </tr>                           
                <tr>
                	<td width="15%">
                    	<strong>Maestro</strong>
                    </td>                 
                    <td>
                    	{{nombre_maestro}}</strong>                                           
                     </td>     
                   <td>{{turno}}</td>
                </tr>                   
            </table>          
        </td>
    </tr>
    
    <tr  >
    	<td style="padding-left:5px;padding-top:15px;">           
            <table width="100%" border="0" cellspacing="" cellpadding="2">
                <tr style="background-color:#fff;">
                	<th style="border:1px solid #000;" width="10%">Mat.</th>
                    <th  style="border:1px solid #000;text-align: left;" >Alumno</th>                                 <!--  <th style="border:1px solid #000;text-align:right" width="15%">Cargo</th>                           <th style="border:1px solid #000;text-align:right" width="15%">Adeuda</th>                           <th style="border:1px solid #000;text-align:right" width="15%">Pagado</th>                      -->
                    </tr>                
                {{#alumnos}}
                <!-- IF -->
                 <tr style="text-align:left;border-bottom:1pt solid #000;">
                    <td style="text-align:left;border-bottom:1pt solid #000;" >{{matricula}}</td>
                    <td style="text-align:left;border-bottom:1pt solid #000;">{{nombre_alumno}}</td>                                     
                    <!--<td >${{cargo}}</td>                    
                    <td align="right">${{total}}</td>
                    <td align="right">${{pago}}</td>-->
                </tr>
                {{/alumnos}}                
            <tr>
             <td <td colspan="5">      
              	<table width="100%" style="text-align: center;"   border="0" >
            	<tr>
                	<td style="heigth:12px" >                    	
                        <strong>¡Gracias por su confianza¡</strong><br/>
                        <small>impresión {{fecha_impresion}} - <small>softlineas.com</small> </small> 
                	</td>
                </tr>    
         
         	</table>              
         	
        </td>
            </tr>
          </table>
        </td>
      </tr>         
</table>       
         	
        </td>
            </tr>
          </table>
        </td>
      </tr>   
      
</table>
</body>
</html>
'
where id = 4;