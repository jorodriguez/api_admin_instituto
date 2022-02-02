const genericDao = require('./genericDao');
const { encriptar } = require('../utils/Utils');

const generarRandomPassword = () => {

    return new Promise((resolve, reject) => {
        var respuesta = { password: "", encripted: "" };

        genericDao
            .findOne(
                `SELECT pass||(random() * 5000 + 1)::int AS password FROM random_pass  ORDER BY random() LIMIT 1;`,
                []
            ).then(result => {
                respuesta.password = result.password;
                respuesta.encripted = encriptar(result.password);
                resolve(respuesta);
            }).catch(e => {
                console.error("Error al generar el password " + e);
                reject(null);
            });
    });
};


const getFechaHoy = async () => {
    return await genericDao.findOne("select getDate('') as fecha_actual, to_char(getDate(''),'YYY-MM-DD') as fecha_actual_format, getHora('') as hora_actual,to_char(getHora(''),'HH24:MI') as hora_actual_format",[]);
};





module.exports = { generarRandomPassword,getFechaHoy };