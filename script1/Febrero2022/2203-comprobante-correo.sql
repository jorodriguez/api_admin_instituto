

alter table co_sucursal add column enviar_recibo_correo boolean default false;

update co_sucursal set enviar_recibo_correo = true where id = 1;