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
        let ilustracao = request.file.filename;
        
        /* adiciono el nuevo servicio al array*/
        servicos.push({id: uuid(), nome, descricao, preco, ilustracao });

        /* convierte el array para json*/
        let dadosJson = JSON.stringify(servicos);

        /*salva json actualizado en el archivo*/
        fs.writeFileSync(servicosPath, dadosJson)

        /* redirecciona para lista de servicios */
        return response.redirect('/admin/servicos')
    },
    editar: (request, response) => {
        /** pegando parametro id da URL */
        let{id} = request.params;
        /** busca srevicio por el id */
        let servicoEncontrado = servicos.find(servico => servico.id == id)
        /** renderiza el view y manda tituloy obj del servicio */
        return response.render('servicosEditar',  { titulo: 'Editar Serviços', servico: servicoEncontrado})
    },
    atualizar: (request, response) => {
        /** pegando parametro id da URL */
        let{id} = request.params;

        /** pegando informaciones del formulario */
        let { nome, descricao, preco} = request.body

        /** busca srevicio por el id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);

        /** atribuir los nuevos valores a servicoEncontrado */
        servicoEncontrado.nome = nome;
        servicoEncontrado.descricao = descricao;
        servicoEncontrado.preco = preco;

        /** verifica si hay una nueva imagen antes de atribuir */
        if(request.file){
            servicoEncontrado.ilustracao = request.file.filename;
        }
        
        /* convierte el array para json*/
        let dadosJson = JSON.stringify(servicos);

        /*salva json actualizado en el archivo*/
        fs.writeFileSync(servicosPath, dadosJson)

        /* redirecciona para lista de servicios */
        return response.redirect('/admin/servicos')
    }
    
}

module.exports = servicosController;