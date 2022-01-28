const { CARGOS } = require('../utils/Constantes');
const { QUERY } = require('../controllers/sqlHelper');
const genericDao = require('./genericDao');
const { ExceptionDatosFaltantes, ExceptionBD } = require('../exception/exeption');
const { isEmptyOrNull } = require('../utils/Utils');


//registrar pagos
/*const registrarCargo = (cargoData) => {
    console.log("@registrarCargo");

    return new Promise((resolve, reject) => {
        const { fecha_cargo, id_alumno, cat_cargo, cantidad, monto, nota, genero } = cargoData;

        let parametros = [];
        let sql = "";

        let respuesta = {
            id_alumno: id_alumno,
            id_cargo: -1,
            resultado: Boolean,
            mensaje: ""
        };

        console.log("CARGOS.ID_CARGO_MENSUALIDAD " + JSON.stringify(cat_cargo));

        if (cat_cargo.id == CARGOS.ID_CARGO_MENSUALIDAD) {
            if ((fecha_cargo == undefined || fecha_cargo == null || fecha_cargo.fecha_mes == undefined || fecha_cargo.fecha_mes == null)) {
                respuesta.resultado = false;
                respuesta.mensaje = "Se requiere la fecha del cargo.";
                reject(new ExceptionDatosFaltantes(respuesta));
                return;
            }
            console.log("cat_cargo.cat_cargo  " + fecha_cargo.fecha_mes);
            //parametros para mensualidad
            sql = "select agregar_cargo_alumno($1,$2,$3,$4,$5,$6,$7) as id_cargo_generado;";
            parametros = [new Date(fecha_cargo.fecha_mes), id_alumno, cat_cargo.id, cantidad, monto, nota, genero];
        } else {
            //no es mensualidad            
            sql = "select agregar_cargo_alumno(getDate(''),$1,$2,$3,$4,$5,$6) as id_cargo_generado;";
            parametros = [id_alumno, cat_cargo.id, cantidad, monto, nota, genero];

        }

        //fecha_cargo date,id_alumno integer, id_cargo integer, cantidad integer,monto numeric,nota text, id_genero integer                             
        genericDao.executeProcedureWithParameters(sql, parametros)
            .then(results => {
                if (results.rowCount > 0) {
                    var id_cargo_generado = results.rows[0].id_cargo_generado;
                    console.log("IDE CARGO GENERADO RESULT " + JSON.stringify(results.rows));
                    respuesta.id_cargo = id_cargo_generado;
                    respuesta.resultado = (id_cargo_generado != null);
                    respuesta.mensaje = `${results.rowCount} fila afectada`;
                    //notificacionService.notificarCargo(id_alumno,id_cargo_generado);                   
                    console.log("Se agrego el cargo correctamente...");
                    resolve(respuesta);
                } else {
                    respuesta.mensaje = "No se guardó el cargo.";
                    console.log("no se guardo el cargo..");
                    reject(respuesta);
                }
            }).catch(error => {
                respuesta.resultado = false;
                respuesta.error = error;
                console.log("Error al intentar ejecutar el procedimiento de registro de cargo " + error);
                reject(respuesta);
            });

    });

};*/

const registrarCargoGeneral =async  (cargoData) => {

    console.log("@registrarCargoGeneral");

        const { id_alumno,co_curso,folio,co_curso_semanas, cat_cargo, cantidad,cargo,total, nota,monto,monto_modificado,monto_original,texto_ayuda,genero } = cargoData;

        console.log('idalumno '+id_alumno);
        console.log('co_curso '+co_curso);
        console.log('folio '+folio);
        console.log('co_curso_semana '+co_curso_semanas);
        console.log('cat_cargo '+cat_cargo);
        console.log('cantiddad '+cantidad);
        console.log('cargo '+cargo);
        console.log('total '+total);
        console.log('nota '+nota);
        console.log('monto '+monto);
        console.log('monto_modificado '+monto_modificado);
        console.log('monto_original '+monto_original);
        console.log('texto_ayuda '+texto_ayuda);
        console.log('genero '+genero);

        //Aqui ir por el cat_cargo y ver el precio para saber si se modifico el precio y poner la bandeja de monto_modificado

        const id =  await genericDao.execute(`INSERT INTO CO_CARGO_BALANCE_ALUMNO(
                            CO_ALUMNO,CO_CURSO,FOLIO,CO_CURSO_SEMANAS,FECHA,Cat_Cargo,CANTIDAD,CARGO,
                            TOTAL,NOTA,MONTO_MODIFICADO,MONTO_ORIGINAL,TEXTO_AYUDA,GENERO)
                            VALUES($1,$2,$3,$4,(getDate('')+getHora(''))::timestamp,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING ID;`
                            ,[id_alumno,co_curso,folio || '',co_curso_semanas, cat_cargo,cantidad,cargo,total,nota,monto_modificado,monto_original,texto_ayuda,genero]);
        console.log("ID DE CARGO GENERADO "+id);

        return id;
       
};

const getCatCargo = async (id) => {
    console.log("@getCatCargo");
    return await genericDao.findOne("SELECT * from cat_cargo WHERE id = $1 and eliminado = false ", [id]);
};



const getColegiaturasPendientesCobranza = async (idSucursal) => {
    console.log("@getColegiaturasPendientesCobranza");
    return await genericDao.findAll(
        `
        select c.id,
        to_char(c.fecha,'dd-MM-yyyy HH24:MI') as fecha_cargo,
        tcargo.nombre as cargo,
        al.uid as uid_alumno,
        al.foto as foto_alumno,
        al.matricula as matricula,
        al.nombre as alumno,
        al.apellidos as apellidos,
        curso.id as id_curso,
        curso.uid as uid_curso,          				
        curso.foto as foto_curso,
        to_char(curso.hora_inicio,'HH24:MI') as hora_inicio_curso,
        to_char(curso.hora_inicio,'HH24:MI') as hora_fin_curso,
        esp.id as id_especialidad,
        esp.nombre as especialidad,
        dia.id as numero_dia_semana,
        dia.nombre as dia,
          semana.numero_semana_curso,
          to_char(semana.fecha_clase,'DD-MM-YYYY') as fecha_clase
    from co_cargo_balance_alumno c inner join cat_cargo tcargo on tcargo.id = c.cat_cargo
                              inner join co_curso_semanas semana on semana.id = c.co_curso_semanas
                              inner join co_alumno al on al.id = c.co_alumno
                              inner join co_curso curso on curso.id = c.co_curso                  							  
                              inner join cat_especialidad esp on esp.id = curso.cat_especialidad
                              inner join cat_dia dia on dia.id = curso.cat_dia
    where c.cat_cargo = $1 
--                  		and semana.fecha_clase = getDate('')   
  and curso.co_sucursal = $2
        and c.pagado = false
        and c.eliminado = false
    order by semana.fecha_clase desc
        `
        ,[CARGOS.ID_CARGO_MENSUALIDAD,idSucursal]);
};


const buscarCargoColegiatura = async (idCurso,idCoCursoSemana,idAlumno)=>{
    return await genericDao.findOne(
        `select * 
         from co_cargo_balance_alumno
            where cat_cargo = 1            
            and co_curso = $1 
            and co_curso_semanas = $2
            and co_alumno = $3
        and eliminado = false
     `, [idCurso,idCoCursoSemana,idAlumno]);
}

const buscarCargoInscripcion = async (idCurso,idAlumno)=>{
    return await genericDao.findOne(
        `select * 
         from co_cargo_balance_alumno
            where cat_cargo = 2
            and co_curso = $1 
            and co_alumno = $2
        and eliminado = false
     `, [idCurso,idAlumno]);
}


const completarRegistroRecargoMensualidad = (idCargoMensualidad, idRecargo, genero) => {

    console.log(`=========================idCargoMensualidad ${idCargoMensualidad},idRecargo ${idRecargo}, genero ${genero}`);

    return genericDao.execute(` UPDATE co_cargo_balance_alumno 
                                SET co_cargo_balance_alumno = $2,
                                    recargo = true,                                    
                                    fecha_modifico = (getDate('')+getHora(''))::timestamp,
                                    modifico = $3
                                WHERE id = $1 RETURNING id;`
        , [idCargoMensualidad, idRecargo, genero]);
};


const getCatalogoCargosPorEmpresa = (idEmpresa) => {
    console.log("@getCatalogoCargosPorEmpresa");
    return genericDao.findAll("SELECT * from cat_cargo WHERe sistema = true or co_empresa = $1 and eliminado = false  ORDER BY id", [idEmpresa]);
};

const getCargosAlumno = (uidAlumno,limite) => {
    console.log("@getCargosAlumno");

    //pagina = (pagina-1);
    console.log("request.params.id_alumno " + uidAlumno);
    console.log("limite " + limite);
    //console.log("pagin " + pagina);
    
//    let offset = (limite * pagina);
return genericDao.findAll(
    ` 
SELECT
b.id as id_cargo_balance_alumno,
b.fecha,
to_char(b.fecha,'dd-mm-yyyy HH24:MI') as fecha_format,
b.cantidad,
cargo.nombre as nombre_cargo,
cargo.aplica_descuento,
b.texto_ayuda,
cat_cargo as id_cargo,
cargo.es_facturable,
b.total as total,
b.cargo,
b.total_pagado,
b.nota,
b.pagado,               	                                         
false as checked,
0 as pago,
esp.nombre as especialidad,
semana.numero_semana_curso,
semana.numero_semana_curso as materia_modulo
FROM co_cargo_balance_alumno b inner join co_alumno a on b.co_alumno = a.id
                            inner join cat_cargo cargo on b.cat_cargo = cargo.id					                                           
                            left join co_curso curso on curso.id = b.co_curso
                            left join cat_especialidad esp on esp.id = curso.cat_especialidad
                            left join co_curso_semanas semana on semana.id = b.co_curso_semanas                            
WHERE a.uid = $1 and b.eliminado = false and a.eliminado = false
ORDER by b.pagado, b.fecha desc
         LIMIT ${limite}`,
    [uidAlumno]);

   /* return genericDao.findAll(
        ` SELECT
               b.id as id_cargo_balance_alumno,
               b.fecha,
               to_char(b.fecha,'dd-mm-yyyy HH24:MI') as fecha_format,
               b.cantidad,
               cargo.nombre as nombre_cargo,
               cargo.aplica_descuento,
               b.texto_ayuda,
               cat_cargo as id_cargo,
               cargo.es_facturable,
               b.total as total,
               b.cargo,
               b.total_pagado,
               b.nota,
               b.pagado,               	                                         
               false as checked,
               0 as pago 
             FROM co_cargo_balance_alumno b inner join co_alumno a on b.co_alumno = a.id
                                           inner join cat_cargo cargo on b.cat_cargo = cargo.id					                                           
             WHERE a.uid = $1 and b.eliminado = false and a.eliminado = false
             ORDER by b.pagado, b.fecha desc
             LIMIT ${limite}`,
        [uidAlumno]);*/

};

const getBalanceAlumno = (idAlumno) => {
    console.log("@getBalanceAlumno");
    console.log("id_alumno ** " + idAlumno);
    return genericDao.findOne(
        `SELECT al.nombre as nombre_alumno,al.apellidos as apellidos_alumno,to_char(al.fecha_limite_pago_mensualidad,'dd-Mon') as fecha_limite_pago_mensualidad, bal.* 
         FROM co_alumno al inner join  co_balance_alumno bal on al.co_balance_alumno = bal.id and bal.eliminado = false
         WHERE al.id = $1::int and al.eliminado = false `
        , [idAlumno]);
    /*
    response,
    (results) => {
        if (results.rowCount > 0) {

            let balance_alumno = results.rows[0];

            response.status(200).json(balance_alumno);

        } else {
            console.log("No existe balance para el alumno " + id_alumno);

            response.status(200).json({});
        }            
    });*/

};



const eliminarCargos = (cargosData) => {
    console.log("@eliminarCargos");

    return new Promise((resolve, reject) => {
        if (isEmptyOrNull(cargosData)) {
            reject(new ExceptionDatosFaltantes("Son nulls los ids a eliminar"));
            return;
        }

        const { ids, motivo, genero } = cargosData;

        var idsCargos = '';
        var first = true;

        ids.forEach(element => {
            if (first) {
                idsCargos += (element + "");
                first = false;
            } else {
                idsCargos += (',' + element);
            }
        });

        console.log("Ids cargos eliminar  " + idsCargos);
        //eliminar_cargos_alumno(IN ids_cargos_param text,motivo text,ID_GENERO integer) 
        genericDao
            .executeProcedure(`SELECT eliminar_cargos_alumno('${idsCargos}','${motivo}',${genero}) as ids_cagos_eliminados;`)
            .then(results => {
                if (results.rowCount > 0) {
                    //Enviar mensaje de recepcion
                    console.log("Resultado del procedimiento " + JSON.stringify(results.rows));
                    var listaIdsCargos = results.rows.map(e => e.ids_cagos_eliminados);
                    console.log(" listaIdsCargos " + listaIdsCargos);
                    resolve(listaIdsCargos);
                }
            }).catch(error => {
                reject(new ExceptionBD(error));
            });

        /*
            response,
            (results) => {
                if (results.rowCount > 0) {
                    //Enviar mensaje de recepcion
                    console.log("Resultado del procedimiento " + JSON.stringify(results.rows));
                    var listaIdsCargos = results.rows.map(e => e.ids_cagos_eliminados);
                    console.log(" listaIdsCargos " + listaIdsCargos);
                    //enviarMensajeEntradaSalida(listaIdsAsistencias, ENTRADA);
                }
                response.status(200).json(results.rowCount);
            });*/
    });
};

const obtenerMesesAdeudaMensualidad = (idAlumno) => {
    console.log("@obtenerMesesAdeudaMensualidad");

    console.log("ID alumno " + idAlumno);
    console.log("CARGOS.ID_CARGO_MENSUALIDAD " + CARGOS.ID_CARGO_MENSUALIDAD);

    return genericDao.findAll(QUERY_MESES_SIN_CARGO_MESUALIDAD, [idAlumno, CARGOS.ID_CARGO_MENSUALIDAD]);
    //getResultQuery(QUERY_MESES_SIN_CARGO_MESUALIDAD, [id_alumno, CARGOS.ID_CARGO_MENSUALIDAD], response);
};


const obtenerFiltroAniosCargosSucursal = (idSucursal) => {
    console.log("@obtenerFiltroAniosCargosSucursal");

    console.log("ID sucursal " + idSucursal);
    return genericDao
        .findAll(
            `
            SELECT to_char(c.fecha,'YYYY')::integer as anio
	        from co_cargo_balance_alumno c inner join co_alumno al on al.co_balance_alumno = al.co_balance_alumno
	        where al.co_sucursal = $1
		        and al.eliminado = false 
		        and c.eliminado = false
	        group by to_char(c.fecha,'YYYY')
	        order by to_char(c.fecha,'YYYY')::integer desc
	
                        `,
            [idSucursal]);

};


const QUERY_MESES_SIN_CARGO_MESUALIDAD = `
with  serie_meses as (
    SELECT g::date as fecha_mes,
           to_char(g::date,'mm')::int as numero_mes,	
           to_char(g::date,'YY')::int as numero_anio,		
           (select nombre from si_meses where id = to_char(g::date,'mm')::int) as nombre_mes         
       FROM  generate_series(
               date_trunc('year', getDate(''))::timestamp,
               (date_trunc('year', getDate(''))) + (interval '1 year') - (interval '1 day'),
             '1 month')  g
       ), meses_pagados AS (
       select 
            sm.fecha_mes as fecha_registrado,
           sm.nombre_mes,
           count(cb.*) as count_registro
       from serie_meses sm inner join co_cargo_balance_alumno cb on to_char(cb.fecha,'MMYYYY') = to_char(sm.fecha_mes,'MMYYYY')
       where cb.co_balance_alumno = (select co_balance_alumno from co_alumno where id = $1 and eliminado = false) 
           and cb.cat_cargo = $2
           and cb.eliminado = false
      group by  sm.nombre_mes,sm.fecha_mes
      order by sm.fecha_mes
    ) select (mp.count_registro is not null) as cargo_registrado,
                s.fecha_mes::text,
                s.nombre_mes,
                s.fecha_mes,
                s.numero_mes,
                s.numero_anio,
                mp.nombre_mes as nombre_mes_registro_cargo,								
                mp.nombre_mes as fecha_mes_registro_cargo,								
                mp.nombre_mes as numero_mes_registro_cargo,	
                mp.nombre_mes as numero_anio_registro_cargo
        from serie_meses s left join meses_pagados mp on mp.fecha_registrado = s.fecha_mes
`;

const obtenerEstadoCuenta = async (idAlumno) => {
    console.log("@obtenerEstadoCuenta");

    console.log("ID alumno " + idAlumno);

    const alumno = await genericDao.findOne(`
    SELECT al.nombre as nombre_alumno,
    al.apellidos as apellidos_alumno,            	
    al.correo,			
    al.total_adeudo,			
    suc.nombre as sucursal,
        suc.id as co_sucursal,
    suc.direccion as direccion_sucursal,
        empresa.id as id_empresa,
    empresa.nombre as empresa,
        al.total_adeudo > 0 as adeuda,
        to_char(getDate(''),'YYYY-MM-DD') as fecha,			
    to_char(getHora(''),'HH24:MI') as hora
 FROM co_alumno al 
                     inner join co_sucursal suc on suc.id = al.co_sucursal							
                    inner join co_empresa empresa on empresa.id = suc.co_empresa
 WHERE al.id = $1 and al.eliminado = false`,
        [idAlumno]);

    const detalleMensualidadesPendientes = await obtenerDetalleEstadoCuenta(
        idAlumno        
    );   

    return {
        alumno: alumno,
        cargos: detalleMensualidadesPendientes || []        
    };


};

const obtenerDetalleEstadoCuenta = async (idAlumno) => {
    console.log("obtenerDetalleEstadoCuenta")

    return await genericDao.findAll(` SELECT a.co_balance_alumno,
               b.id as id_cargo_balance_alumno,
               b.fecha,
               to_char(b.fecha,'dd-mm-yyyy') as fecha_format,
               to_char(b.fecha,'HH24:MI') as hora_format,
               b.cantidad,
               cargo.nombre as nombre_cargo,
               cargo.aplica_descuento,
               b.texto_ayuda,
               cat_cargo as id_cargo,
               cargo.es_facturable,
               b.total as total,
               b.cargo,
               b.total_pagado,
               b.nota,
               b.pagado,                              
               b.descuento, 
               cargo.id <> ${CARGOS.ID_CARGO_MENSUALIDAD} as mostrar_nota
             FROM co_cargo_balance_alumno b inner join co_alumno a on b.co_alumno = a.id 
                                           inner join cat_cargo cargo on b.cat_cargo = cargo.id					                                           
             WHERE a.id = $1                  
					and b.pagado = false
			 		and b.eliminado = false
					and a.eliminado = false
              ORDER by b.pagado,cargo.nombre asc, b.fecha desc`,
        [idAlumno]);
};

const getCargoExtraMensualidadEmpresa = (idEmpresa) => {
    console.log("@getCargoExtraEmpresa");
    return genericDao.findAll(`SELECT * 
                                FROM CAT_CARGO
                                WHERE co_empresa = $1
                                AND identificador = 'CAEX'
                                AND eliminado = false 
                                ORDER BY id DESc
                                LIMIT  1`, [idEmpresa]);
};



const getCargoPorAlumno = (idAlumno,idCargo) => {
    console.log("@existeCargoPorAlumno");
    return genericDao.findOne(`select * from co_cargo_balance_alumno where co_alumno = $1 and cat_cargo = $2 and eliminado = false limit 1`, [idAlumno,idCargo]);
};


module.exports = {    
    registrarCargoGeneral,
    getCatalogoCargosPorEmpresa,
    getCargosAlumno,
    getBalanceAlumno,
    eliminarCargos,
    obtenerMesesAdeudaMensualidad,
    completarRegistroRecargoMensualidad,
    obtenerFiltroAniosCargosSucursal,
    obtenerEstadoCuenta,
    getCargoExtraMensualidadEmpresa,
    getCargoPorAlumno,
    buscarCargoColegiatura,
    buscarCargoInscripcion,
    getCatCargo,
    getColegiaturasPendientesCobranza
};