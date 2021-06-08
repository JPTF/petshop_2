/** middleware  - validación de cadastro  de servicio */
const servico = (request, response, next) => {
    let { nome, preco, descricao } = request.body;

    if (nome == "" || preco  == "" || descricao == ""){
        // retorna el mensaje error
        response.send("Preencha todos os campos obrigatorios!");
    }  else if (nome.length < 3 || nome.length > 15 || preco <= 0) {
        response.send("Campos invalidos!");
    } else {
        /** ejecuta proxima funcion/controller */
        next();
    }
}

module.exports = servico