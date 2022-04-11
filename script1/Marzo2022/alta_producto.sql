
alter table cat_articulo alter column foto set default 'https://res.cloudinary.com/dwttlkcmu/image/upload/v1647452466/static/logoproducto_d7cmqg.png';

alter table cat_articulo add column public_id_foto text ;


alter table cat_articulo add column cat_unidad_medida integer references cat_unidad_medida(id);

insert into cat_unidad_medida(id,nombre,co_empresa,genero)
values(1,'PIEZA',1,1),
	 (2,'LITRO',1,1),
	 (3,'ML',1,1)

update cat_articulo set cat_unidad_medida = 1;

alter table cat_articulo alter column cat_unidad_medida set not null;

update co_template 
set template_ticket_venta ='

<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
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
                    				<strong>Venta</strong>
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
            <br/>
            <table width="100%" style="background-color:white">
                <tr>
                    <td  width="20%"><strong>Fecha</strong></td>
                    <td>{{fecha}}</td>
                </tr>                
            </table>
            <br/>
            <table width="100%" border="0" cellspacing="2" cellpadding="2">
                <tr>
                    <th width="55%" style="border-bottom:1pt solid #57A8B6;text-align: left;" >Artículo</th>                    
                    <th width="15%" style="border-bottom:1pt solid #57A8B6;" width="10%">Cant.</th>
                    <th style="border-bottom:1pt solid #57A8B6;text-align:right" width="15%" align="right">Precio</th>                                       
                    <th style="border-bottom:1pt solid #57A8B6;text-align:right" width="15%" align="right">Importe</th>                   
                </tr>                
                {{#detalle}}
                <!-- IF -->
                <tr style="text-align:left">
                    <td colspan="4">{{articulo}} - {{marca}} {{codigo}}                                                        </td>
                 </tr>
                 <tr style="text-align:right">
                 <td style="border-bottom:1pt solid #57A8B6;">{{unidad_medida}}</td>

                    <td style="border-bottom:1pt solid #57A8B6;"> {{cantidad}}</td>
                    <td style="border-bottom:1pt solid #57A8B6;text-align:right" align="right">${{precio}}</td>                                        
                    <td style="border-bottom:1px solid #57A8B6;text-align:right" align="right">${{importe}}</td>
                    <!--<td>{{nota}}</td>-->
                </tr>
                {{/detalle}}
                <tr>                	
                    <td colspan="3" style="text-align:right">
                        <strong>Total:</strong>
                    </td>
                    <td style="text-align:right;" valign="center" align="right">
                        <strong> ${{total}}</strong> 
                    </td>
            </tr>
            <tr>                	
                    <td colspan="3" style="text-align:right">
                        <strong>Recibido:</strong>
                    </td>
                    <td style="text-align:right;" valign="center" align="right">
                        <strong> ${{recibido}}</strong> 
                    </td>
            </tr>
             <tr>                	
                    <td colspan="3" style="text-align:right">
                        <strong>Cambio:</strong>
                    </td>
                    <td style="border-bottom:2pt solid #57A8B6;text-align:right;background-color:#F7F7F7" valign="center" align="right">
                        <strong> ${{cambio}}</strong> 
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

';


--- para nueva opcion

insert into si_rol(id,si_modulo, nombre,genero)
values(7,1,'ADMIN INVENTARIO',1);

--registro de opcion
select * from si_opcion

insert into si_opcion(id,si_modulo,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(13,1,'Productos','Productos','fas fa-table',7,true,1);

--agregando opcion para el rol ventas
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(7,13,1); -- ventas para rol ventas


-- opcion de movimientos ventas
insert into si_opcion(id,si_modulo,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(14,1,'Ventas Sucursal','ConsultaVentas','fas fa-ticket',7,true,1);

--agregando opcion para el rol ventas
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(7,14,1); -- ventas para rol ventas


--- asignacion de ventas a usuarios de monterrey
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,1,7,1,1),--para admin	 
	 (13,1,7,1,1), -- para direccion
	 (16,1,7,1,1), -- para yesi
	 (14,1,7,1,1); -- para carmelo


--- asignacion de ventas a usuarios de apodaca
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,2,7,1,1),--para admin	 
	 (127,2,7,1,1), -- para direccion
	 (14,2,7,1,1), -- para carmelo
	 (12,2,7,1,1); -- para manuek


update si_opcion set nombre = 'TPDV' where id = 12;


update si_opcion set nombre = 'Productos', ruta='Productos' where id = 13;



--- opcion para inventarios
insert into si_opcion(id,si_modulo,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(15,1,'Inventario','Inventario','fas fa-table',8,true,1);


--agregando opcion para el rol ventas
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(7,15,1); -- ventas para rol ventas

alter table ve_movimiento add column nota text;

alter table ve_movimiento add column precio numeric not null;


--modificar restriccion CHECK
alter table cat_tipo_movimiento drop constraint cat_tipo_movimiento_afectacion_check;

insert into cat_tipo_movimiento(id,co_empresa,nombre,descripcion,afectacion,sistema,genero)
values(5,1,'AJUSTE/LIBRE','Ajuste o modificación libre de existencia','AJUSTE_LIBRE',true,1);



insert into cat_tipo_movimiento(id,co_empresa,nombre,descripcion,afectacion,sistema,genero)
values(6,1,'DEVOLUCION_VENTA','Entrada por devolución de venta','ENTRADA',true,1);


insert into cat_tipo_movimiento(id,co_empresa,nombre,descripcion,afectacion,sistema,genero)
values(7,1,'CANCELACION_VENTA','Entrada por cancelación de venta','ENTRADA',true,1);
