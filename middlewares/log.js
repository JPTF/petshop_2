const fs = require('fs');
const { networkInterfaces } = require('os');

const log = (request, response, next) => {
    /** crea el  archivo  log.text si no existe e adiciona el mensaje al arquivo */
    fs.appendFileSync('log.txt', `O usuario acessou a url: ${request.url} \n`);
    /** ejecuta la próxima función (controller) */
    next();
}

/** exporta el middleware */
module.exports = log