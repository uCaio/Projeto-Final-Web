const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para exibir o cadastro de cliente
router.get('/cadastro', clienteController.exibirCadastroCliente);

// Rota para cadastrar um cliente
router.post('/cadastro', clienteController.cadastrarCliente);

module.exports = router;
