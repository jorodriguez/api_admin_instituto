

CREATE TABLE cat_marca
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE cat_tipo_movimiento
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	nombre text not null, 
	descripcion text,
	afectacion varchar(15)  check (afectacion = 'ENTRADA' or afectacion = 'SALIDA') ,--//salida
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE cat_cliente
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL references co_empresa(id),		
	co_sucursal integer NOT NULL references co_sucursal(id),		
	nombre text not null, 
	correo text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


CREATE TABLE cat_unidad_medida
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


drop table cat_articulo_sucursal




CREATE TABLE cat_articulo
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	cat_marca integer NOT NULL  references cat_marca(id),						
	codigo text not null,
	nombre text not null, 
	descripcion text,			
	foto text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE cat_articulo_sucursal
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),				
	cat_articulo integer NOT NULL  references cat_articulo(id),						
	precio numeric not null default 1,
	costo_base numeric not null default 0,
	cantidad_existencia numeric not null default 0,
	stock_minimo numeric not null default 0,	
	nota_interna text,			
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


CREATE TABLE ve_venta
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	cat_cliente integer NOT NULL  references cat_cliente(id),				
	folio text not null,
	fecha timestamp without time zone DEFAULT (getDate('')+getHora('')),
	cantidad_articulos numeric not null,		
	total numeric not null,
	recibido numeric not null,
	cambio numeric not null,
	nota_venta text,	
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE ve_venta_detalle
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	ve_venta integer NOT NULL  references ve_venta(id),				
	cat_articulo_sucursal integer NOT NULL  references cat_articulo_sucursal(id),					
	cantidad numeric not null,		
	precio numeric not null,
	importe numeric not null,					
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE ve_movimiento
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),		
	co_sucursal integer NOT NULL  references co_sucursal(id),			
	cat_tipo_movimiento integer NOT NULL  references cat_tipo_movimiento(id),				
	cat_articulo_sucursal integer NOT NULL  references cat_articulo_sucursal(id),					
	cantidad numeric not null,				
	cantidad_anterior numeric not null,				
	cantidad_posterior numeric not null,				
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE cat_categoria
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),			
	nombre text not null, 
	descripcion text,
	fecha_genero timestamp without time zone DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp without time zone,
	genero integer NOT NULL  references usuario(id),		
	modifico integer references usuario(id),		
	eliminado boolean NOT NULL DEFAULT false    
);


alter table  cat_tipo_movimiento add column sistema boolean default false;

alter table  cat_articulo add column cat_categoria integer not null references cat_categoria(id);

insert into cat_tipo_movimiento(id,nombre,descripcion,afectacion,co_empresa,genero)
values(1,'VENTA','ventas al publico','SALIDA',1,1),
      (2,'COMPRAS','ventas al publico','ENTRADA',1,1),
      (3,'AJUSTE','Ajuste del inventario','ENTRADA',1,1),
      (4,'AJUSTE','Ajuste del inventario','SALIDA',1,1);

insert into cat_marca(nombre,descripcion,co_empresa,genero)
values('SIN MARCA','SIN MARCA',1,1);


insert into cat_categoria(nombre,descripcion,co_empresa,genero)
values('SIN CATEGORIA','SIN CATEGORIA',1,1);


insert into cat_articulo(codigo,nombre,descripcion,foto,co_empresa,cat_marca,cat_categoria,genero)
values('01','PRODUCTO DE PRUEBA','Es un producto de prueba - esto es la descripción',null,1,1,1,1);



insert into cat_articulo_sucursal(co_empresa,co_sucursal,cat_articulo,precio,costo_base,cantidad_existencia,stock_minimo,nota_interna,genero)
values(1,1,(select id from cat_articulo where codigo ='01'),1,1,100,10,'es un producto de prueba',1);



insert into cat_marca(nombre,descripcion,co_empresa,genero)
values('REVLON','REVLON',1,1);

insert into cat_categoria(nombre,descripcion,co_empresa,genero)
values('TINTES','TINTES',1,1);

insert into cat_articulo(codigo,nombre,descripcion,foto,cat_marca,cat_categoria,co_empresa,genero)
values(	'02'
		,'Colorsilk Beautiful Color - Tinte permanente para el cabello de alta definición y larga duración, brillo y suavidad sedosa con cobertura del 100 % de las canas, sin amoníaco, rubio sol ultraclaro 003, paquete de 1 unidad'		 
		,'Tinte permanente con la calidad de la peluquería, pero en tu casa: Práctico kit de teñido del cabello para uso hogareño desarrollado por expertos de peluquería para lograr resultados duraderos.'
		,'https://res.cloudinary.com/dwttlkcmu/image/upload/v1645130301/paris/articulos/81UlNjOeXJL._SL1500__twn64y.jpg'
		,(select id from cat_marca where  nombre ='REVLON')
		,(select id from cat_categoria where  nombre ='TINTES')
		,1,1);

insert into cat_articulo_sucursal(co_empresa,co_sucursal,cat_articulo,precio,costo_base,cantidad_existencia,stock_minimo,nota_interna,genero)
values(1,1,(select id from cat_articulo where codigo ='02'),45,25,100,10,'es un producto de prueba',1);

------------------ROLES y OPCION

insert into si_rol(id,si_modulo, nombre,genero)
values(6,1,'VENTAS',1);

--registro de opcion
select * from si_opcion

insert into si_opcion(id,si_modulo,nombre,ruta,icono_menu,orden,menu_principal,genero)
values(12,1,'Ventas','Venta','fas fa-barcode',6,true,1);


select * from si_rol_opcion

--agregando opcion para el rol ventas
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(6,12,1); -- ventas para rol ventas



select * from usuario


-- rol para usuarios vendedores
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,1,6,1,1),--para admin
	 (16,1,6,1,1), -- para yesica
	 (13,1,6,1,1); -- para direccion


insert into cat_cliente(id,co_empresa,co_sucursal,nombre,correo,genero)
values(1,1,1,'MOSTRADOR','',1);

alter table co_template add column template_ticket_venta text;


insert into co_consecutivo(nombre,identificador,anio,co_empresa,co_sucursal,valor,genero)
 values('TICKET_VENTA','TICKET_VENTA',22,1,1,0,1);


update co_template 
set template_ticket_venta='
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
                    <td colspan="4">{{articulo}} {{codigo}}                                                        </td>
                 </tr>
                 <tr style="text-align:right">
                    <td colspan="2" style="border-bottom:1pt solid #57A8B6;">{{cantidad}}</td>
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
'
where id = 2;

ALTER TABLE cat_articulo ADD CONSTRAINT constraint_unik UNIQUE (codigo);

ALTER TABLE cat_articulo_sucursal ADD CONSTRAINT constraint_unik_em UNIQUE (cat_articulo,co_empresa,co_sucursal);