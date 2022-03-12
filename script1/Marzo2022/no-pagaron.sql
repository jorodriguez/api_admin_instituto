
    

       alter table co_sucursal add column pago_pendiente boolean default false;

        alter table co_sucursal add column pago_pendiente_imagen text default '';
        
        alter table co_sucursal add column pago_pendiente_fondo text default '#fff';

        alter table co_sucursal add column pago_pendiente_bloquear boolean default false;

   UPDATE CO_SUCURSAL 
        		SET PAGO_PENDIENTE = true ,
        		pago_pendiente_imagen='https://img.freepik.com/vector-gratis/lindo-gato-jugando-ilustracion-icono-vector-dibujos-animados-bola-hilo-concepto-icono-naturaleza-animal-aislado-vector-premium-estilo-dibujos-animados-plana_138676-3568.jpg',
        		pago_pendiente_fondo='yellow',
        		pago_pendiente_bloquear=false        		
        			where id=1;
