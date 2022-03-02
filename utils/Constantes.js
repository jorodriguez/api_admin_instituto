
const CARGOS = {
      ID_CARGO_MENSUALIDAD : 1,ID_TIEMPO_EXTRA:3,ID_RECARGO_MENSUALIDAD :4
};

const ESTATUS = {
    OK : 200
};

const TIPO_CARGO = {
    PRODUCTO : 1,
    SERVICIO : 2
};

const TIPO_TEMPLATE = {
    RECIBO_PAGO : "TEMPLATE_RECIBO_PAGO",
    RECIBO_PAGO_CORREO : "TEMPLATE_RECIBO_PAGO_CORREO",
    CORTE_DIARIO:"TEMPLATE_CORTE_DIA",
    TICKET_VENTA:"TICKET_VENTA",
    BIENVENIDA_ALUMNO:"BIENVENIDA_ALUMNO",
    CORTE_DIARIO_ENVIO_CORREO:"CORTE_DIARIO_ENVIO_CORREO"

};

const TEMA_NOTIFICACION ={  ID_TEMA_NOTIFICACION_PAGOS:2,
                            ID_TEMA_DATOS_FACTURACION:5,
                            ID_TEMA_CORTE_DIARIO:3,
                            ID_TEMA_NOTIFICACION_ALTA_FAMILIAR:4,
                            ID_TEMA_REPORTE_RECARGOS : 6,
                            ID_TEMA_ALTA_ALUMNO : 7
                        };

                        const TEMPLATES = {
                            TEMPLATE_AVISO: "aviso.html",
                            TEMPLATE_GENERICO: "generico.html",
                            TEMPLATE_RECIBO_PAGO: "recibo_pago.html",
                            TEMPLATE_CORTE_DIARIO: "corte_diario.html",
                            TEMPLATE_AVISO_CARGO: "aviso_cargo.html",
                            TEMPLATE_DATOS_FACTURACION: "datos_factura.html",
                            TEMPLATE_RECORDATORIO_PAGO_MENSUALIDAD: "recordatorio_recargo_mensualidad.html",
                            TEMPLATE_REPORTE_PROX_RECARGOS: "reporte_prox_recargo_mensualidad.html",
                            TEMPLATE_ESTADO_CUENTA: "estado_cuenta.html"
                        };
                        

const ROWS_POR_PAGINACION = 5;

const USUARIO_DEFAULT= 1;

const ENTRADA = 0;
const SALIDA = 1;

const TIPO_USUARIO = {MAESTRA:1};

//quitar despues de crear la funcionalidad de empresa
const ID_EMPRESA_DEFAULT = 1;

const MENSAJE_RECARGO_POR_MENSUALIDAD_VENCIDA = " (MENSUALIDAD VENCIDA).";

const SIN_COPIA = '';


//nombre del folder donde se guardan la foto de los alumnos
const FOLDER_PERFILES_CLOUDNARY = "perfiles_alumnos";

const TIPO_PUBLICACION = { EMPRESA:1,SUCURSAL:2,GRUPO:3,CONTACTO:4 };

const SUPER_USUAURIO = 1;

const ID_CARGO_COLEGIATURA = 1;
const ID_CARGO_INSCRIPCION = 2;

module.exports = {
    CARGOS,
    ESTATUS,
    ROWS_POR_PAGINACION,
    TIPO_CARGO,
    USUARIO_DEFAULT,
    ENTRADA,SALIDA,
    TIPO_USUARIO,
    ID_EMPRESA_DEFAULT,
    TEMA_NOTIFICACION,
    MENSAJE_RECARGO_POR_MENSUALIDAD_VENCIDA,
    SIN_COPIA,
    FOLDER_PERFILES_CLOUDNARY,
    TIPO_PUBLICACION,
    SUPER_USUAURIO,
    ID_CARGO_COLEGIATURA,
    ID_CARGO_INSCRIPCION,
    TIPO_TEMPLATE,
    TEMPLATES,    
};