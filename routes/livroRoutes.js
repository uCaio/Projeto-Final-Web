const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const { Livro } = require('../models/db').models;

// Rota para exibir o cadastro de livro
router.get('/cadastroLivro', livroController.exibirCadastroLivro);

// Rota para cadastrar um livro
router.post('/cadastroLivro', livroController.cadastrarLivro);

router.get('/listaLivros', livroController.listarLivro);

router.get('/cadastroLivro/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).send('<h2>Livro não encontrado.</h2>');
        }
        res.render('editarCadastroLivro', { livro });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar cliente.');
    }
});

router.patch('/cadastroLivro/editar/:id', livroController.editarLivro);
module.exports = router;
