const handle = require('../helpers/handlersErrors');
const impresionService = require('../services/impresionService');
const html_to_pdf = require('html-pdf-node');

const getFormatoCredencial = async(request, response) => {
    console.log("@getFormatoCredencial");
    try {

        const { uidAlumno, genero } = request.params;

        console.log("uid " + uidAlumno);

        const html = await impresionService.getFormatoCredencial(uidAlumno, genero);

        let options = { format: 'letter', name: "credendial" };

        let file = { content: html };

        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            console.log("PDF Buffer:-", pdfBuffer);

        });

        res.setHeader('Content-Type', 'application/pdf');

        //        response.status(200).send(html);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getFormatoCredencial
};