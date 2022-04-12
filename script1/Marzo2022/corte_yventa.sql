
update co_template set template_corte_dia='

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
                	<td style="border-bottom: 0px solid gray;" width="70%">
                    	<span>+Cobranza</span>                       
                    </td>                 
                    <td style="border-bottom: 0px solid gray;"  align="right">
                    	<span>${{total_ingreso}}</span> 
                    </td>
                </tr>   
                <tr >
                	<td style="border-bottom: 1px solid gray;" width="70%">
                    	<span>+Ventas</span>                                                     </td>                 
                    <td style="border-bottom: 1px solid gray;"  align="right">
                    	<span>${{total_ingreso_venta}}</span> 
                    </td>
                </tr>
                <tr >
                	<td style="border-bottom: 0px solid gray;" width="70%">
                    	<span><strong>Total Ingreso</strong></span>                                                     </td>                 
                    <td style="border-bottom: 0px solid gray;"  align="right">
                    	<span><strong>${{total_ingreso_sucursal}}</strong></span> 
                    </td>
                </tr>
                <tr>
                	<td width="70%">
                    	<span>-Gasto</span>                       
                    </td>                 
                    <td  align="right">
                    	<span>${{total_gasto}}</span> 
                    </td>
                </tr>                  
                 <!--<tr>
                	<td width="70%">
                    	<span>-Depositos</span>                       
                    </td>                 
                    <td  align="right">
                    	<span>${{total_depositos}}</span> 
                    </td>
                </tr>  --->
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

where id = 2