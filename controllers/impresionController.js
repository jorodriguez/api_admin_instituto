const handle = require('../helpers/handlersErrors');
const impresionService = require('../services/impresionService');
const html_to_pdf = require('html-pdf-node');


const getFormatoCredencial = async(request, response) => {
    console.log("@getFormatoCredencial");
    try {

        const { uidAlumno, format, genero } = request.params;

        console.log("uid " + uidAlumno);

        const html = await impresionService.getFormatoCredencial(uidAlumno, genero);

        let options = { format: 'letter', name: "credendial" };

        let file = { content: html };



        if (format == 'PDF') {
            html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
                console.log("PDF Buffer:-", pdfBuffer);
                response.setHeader('Content-disposition', 'inline; filename="credencial.pdf"');
                response.setHeader('Content-type', 'application/pdf');
                response.send(pdfBuffer);
                //pdfBuffer.pipe(response);
            });

        } else {
            response.status(200).send(html);
        }

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getFormatoCredencial
};