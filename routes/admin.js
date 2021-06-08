const express = require('express'); //chama modulo express
const multer = require ('multer'); // chama modulo multer (upload fotos y archivos)
const path = require ('path'); // chama modulo path (camino de los archivos)
const router = express.Router(); //chama metodo que gerencia las rutas
const servicosController = require('../controllers/servicosController');
const validaCadastroServico = require('../middlewares/validacao/servico');

/** configuraciones de multer*/
const storage = multer.diskStorage({
    /**destino del upload */
    destination: (req, file, cb) => {
        /** guarda archivos en la pasta uploads */
        cb(null, path.join('uploads'))
    },
    /** nombre del upload */
    filename: (req, file, cb) => {
        /** guarda arquivo com nome do campo + data e hora + extencion */
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer ({storage});

/* http://localhost:3000/admin */
router.get('/', (request, response)=> {
    response.render('admin', {titulo: 'Painel Administrativo'});
});

/* http://localhost:3000/admin/servicos */
router.get('/servicos', servicosController.index);

/*http://localhost:3000/admin/servicos/cadastro */
router.get('/servicos/cadastro', servicosController.cadastro);

/*http://localhost:3000/admin/servicos/cadastro */
router.post('/servicos/cadastro', upload.single('ilustracao'), validaCadastroServico, servicosController.salvar);

/*http://localhost:3000/admin/servicos/editar */
router.get('/servicos/editar/:id', servicosController.editar);

/*http://localhost:3000/admin/servicos/editar/:id/?_method=PUT */
router.put('/servicos/editar/:id', upload.single('ilustracao'), validaCadastroServico, servicosController.atualizar);

module.exports = router;
