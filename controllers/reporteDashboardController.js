
const handle = require('../helpers/handlersErrors');
const reporteDashboardService = require('../services/reporteDashboardService');

const getContadoresDashboard = async (request, response) => {
    console.log("@getContadoresDashboard");
    try {

        const { coEmpresa,coSucursal } = request.params;
        
        const contadores = await reporteDashboardService.getDashboardContadores({coEmpresa,coSucursal});

        response.status(200).json(contadores);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getContadoresDashboard
};
