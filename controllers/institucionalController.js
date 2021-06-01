/* modulo instalado para minipulacion de archivos*/
const fs = require('fs');
/* modulo nativo para manipulacion de archivos*/
const path = require ('path');

/* camino del archivo json*/
const servicosPath = path.join('servicos.json');
/** lee contenido del archivo json */
let servicos = fs.readFileSync(servicosPath, {encoding: 'utf-8'});
/**Convierte JSON en array */
servicos = JSON.parse(servicos);

const institucionalController = {
    index: (request, response) => {
        return response.render('index', { titulo: 'Home' });
    },
    sobre: (request, response) => {
        return response.render('sobre', { titulo: 'Sobre' });
    },
    servicos: (request, response) => {
         /** renderiza la view SERVICIOS y pasa el titulo y lista de servicios cadastrados */
        return response.render('servicos', { titulo: 'Serviços', servicos });
    },
    contato: (request, response) => {
        return response.render('contato', { titulo: 'Contato' });
    }
}

module.exports = institucionalController;