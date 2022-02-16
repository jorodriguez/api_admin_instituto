const articuloDao = require('../dao/articuloDao');


module.exports = { 
                    getArticuloCodigo:articuloDao.getArticuloCodigo,
                    getArticulosPorNombre:articuloDao.getArticulosPorNombre,
                    getArticulos:articuloDao.getArticulos,
                    createArticulo:articuloDao.createArticulo,
                    updateArticulo:articuloDao.updateArticulo,
                    updatePrecio:articuloDao.updatePrecio                                      
                 };
