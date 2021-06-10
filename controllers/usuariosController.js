const bcrypt = require('bcrypt');
/** módulo instalado para manipulação de arquivos */
const fs = require('fs');
/** modulo nativo para manipulação de arquivos */
const path = require('path');
/** modulo instalado para gerar id */
const { uuid } = require('uuidv4');

/* camino del archivo json*/
const usuariosPath = path.join('usuarios.json');
/** lee contenido del archivo json */
let usuarios = fs.readFileSync(usuariosPath, {encoding: 'utf-8'});
/** convierte usuarios para array */
usuarios = JSON.parse(usuarios);

const usuariosController = {
    cadastro:(request, response) => {
        response.render("cadastro", { titulo: "Cadastre-se" })
    },
    salvar: (request, response) =>{
        const { nome, email, senha} = request.body;
        /** criptografa a senha */
        const senhaCrypt = bcrypt.hashSync(senha, 10);
        /** adiciona nuevo usuario a la lista de JSON*/
        usuarios.push({ id: uuid(), nome, email, senha: senhaCrypt});
        
        /** convierte el array para JSON */
        let dadosJson =JSON.stringify(usuarios);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(usuariosPath,  dadosJson);

        /** redireciona para Login */
        response.redirect("/login")

    },
    login:(request, response)=>{
        response.render("login", { titulo: "Login"})
    }, 
    autenticacao:(request, response) =>{
        const { email, senha } = request.body;

        /** busca usuario por el email */
        const usuarioEncontrado = usuarios.find(usuario => usuario.email == email)

        if (usuarioEncontrado && bcrypt.compareSync(senha, usuarioEncontrado.senha)){
            /** usuario autenticado */
            /** crea a sección y guarda informaciones de usuario logado*/
            request.session.usuarioLogado = usuarioEncontrado
            /** redirecciona para la pagina inicial */
            response.redirect('/');
        } else {
            /** usuario no autenticado */
            response.redirect('/login');
        }
    }
}

module.exports = usuariosController;