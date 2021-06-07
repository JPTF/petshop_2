/** middleware  - validación de cadastro  de servicio */
const servico = (request, response, next) => {
    let { nome, preco } = request.body;

    if (nome == "" || preco  == ""){
        // retorna el mensaje error
        response.send("Preencha todos os campos obrigatorios!");
    }  else {
        /** ejecuta proxima funcion/controller */
        next();
    }
}

module.exports = servico