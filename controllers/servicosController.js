/* modulo instalado para minipulacion de archivos*/
const fs = require('fs');
/* modulo nativo para manipulacion de archivos*/
const path = require ('path');
/* modulo instalado para generar id */
const {uuid} = require ('uuidv4');

/* camino del archivo json*/
const servicosPath = path.join('servicos.json');

let servicos = fs.readFileSync(servicosPath, {encoding: 'utf-8'});
servicos = JSON.parse(servicos);

const servicosController = {
    index: (req, res) => {
        return res.render("adminServicos", {titulo: 'Serviços', servicos});
    },
    cadastro: (request, response) => {
        /* renderiza formulario de cadastro */
        return response.render('servicosCadastro', { titulo: 'Cadastrar Serviço'});
    },
    salvar: (request, response) => {
        let {nome, descricao, preco} = request.body;

        /** pega el nombre del archivo (upload) */
        let ilustracao = request.file.path;
        
        /* adiciono el nuevo servicio al array*/
        servicos.push({id: uuid(), nome, descricao, preco, ilustracao });

        /* convierte el array para json*/
        let dadosJson = JSON.stringify(servicos);

        /*salva json actualizado en el archivo*/
        fs.writeFileSync(servicosPath, dadosJson)

        /* redirecciona para lista de servicios */
        return response.redirect('/admin/servicos')
    },
    show: (req, res) => {
        // console.log(req.params);
        // pegando parametro nome de rota /servico/:nome
        const {nome} = req.params

        return res.send(`exibindo detalhes do servico ${nome}`);
    }
}

module.exports = servicosController;