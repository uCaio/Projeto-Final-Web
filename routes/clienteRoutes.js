const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { Cliente } = require('../models/db').models;

// Rota para exibir o cadastro de cliente
router.get('/cadastro', clienteController.exibirCadastroCliente);

// Rota para cadastrar um cliente
router.post('/cadastro', clienteController.cadastrarCliente);

router.patch('/cadastro', clienteController.editarCliente);

router.get('/listaClientes', clienteController.listarClientes);

router.get('/cadastro/editar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id); // Busca o cliente pelo ID
      if (!cliente) {
        return res.status(404).send('<h2>Cliente não encontrado.</h2>');
      }
      res.render('editarCadastro', { cliente }); // Renderiza o formulário com os dados do cliente
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar cliente.');
    }
});

router.patch('/cadastro/editar/:id', clienteController.editarCliente);
module.exports = router;
