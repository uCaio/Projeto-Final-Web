const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Rota para exibir o cadastro de livro
router.get('/cadastroLivro', livroController.exibirCadastroLivro);

// Rota para cadastrar um livro
router.post('/cadastroLivro', livroController.cadastrarLivro);

module.exports = router;
