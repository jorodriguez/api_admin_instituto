
alter table co_curso add column inscripciones_cerradas boolean not null default false;

alter table co_curso add column  motivo_inscripciones_cerradas text;
