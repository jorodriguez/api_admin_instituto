
const { pool } = require('../db/conexion');

const registrarBalanceAlumno = async (id_alumno,genero) => {
    console.log("@ragistrarBalanceAlumno");
    try {  
            const results = await pool.query("select insertar_balance_alumno($1,$2)",[id_alumno,genero]);
            return results.rowCount > 0;            
        /* pool.query("select insertar_balance_alumno($1,$2)",                               
            [id_alumno,genero],
            (error, results) => {
                if (error) {
                    console.log("error al invocar el procedimeinto de alta de balance "+error);
                    return false;
                }                
                console.log("Se creo el balance y se relaciono ");                
                return results.rowCount > 0;                
            });
            */
    } catch (e) {
        console.log("error no controlado  "+e);     
        return false;        
    }
};


module.exports = {
    registrarBalanceAlumno
}